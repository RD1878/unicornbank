import React, {
  FC,
  useEffect,
  useState,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withTheme, useTheme } from "@material-ui/core/styles";
import {
  Box,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import IconButton from "@material-ui/core/IconButton";
import FormatIndentDecreaseRoundedIcon from "@material-ui/icons/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRoundedIcon from "@material-ui/icons/FormatIndentIncreaseRounded";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { ROUTES } from ".././routes";
import { Alert } from "@material-ui/lab";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, authSelector } from "../selectors";
import firebase from "firebase";
import { db } from "./../firebase/firebase";
import { requestUser } from "../actions";
import { DRAWER_WIDTH, SHACKBAR_SHOW_DURATION } from "../constants";
import { TAlert } from "../interfaces/tAlert";
import { useTranslation } from "react-i18next";
import DialogNewProduct from "../molecules/DialogNewProduct";
import { CardsList, LanguageMobileSelect } from "../molecules";
import { AddAvatar, CardIconItem, UserAvatar } from "../atoms";

interface IWithOpen {
  open: boolean;
}

const StyledDrawer = withTheme(styled(({ open, width, ...props }) => (
  <Drawer classes={{ paper: "paper" }} open={open} width={width} {...props} />
))`
  & .paper {
    position: relative;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
    overflow-y: unset;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    width: ${(props) =>
      props.view === "mobile"
        ? 320
        : props.open
        ? props.width
        : props.theme.spacing(15)}px;
    transition: ${(props) =>
      props.theme.transitions.create("width", {
        easing: props.theme.transitions.easing.sharp,
        duration: props.open
          ? props.theme.transitions.duration.enteringScreen
          : props.theme.transitions.duration.leavingScreen,
      })};
  }
`);

const StyledIconButton = styled(IconButton)`
  align-self: flex-start;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const StyledProfileInfo = withTheme(styled(Box)<IWithOpen>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px auto 0;
  max-width: ${(props) => (props.open ? 290 : 0)}px;
  max-height: ${(props) => (props.open ? "100%" : 0)};
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0)")};
  transition: ${(props) =>
    props.theme.transitions.create(["transform", "max-height", "max-width"], {
      easing: props.theme.transitions.easing.sharp,
      duration: props.open
        ? props.theme.transitions.duration.enteringScreen
        : props.theme.transitions.duration.leavingScreen,
    })};
`);

const StyledWrap = styled(Box)<IWithOpen>`
  position: sticky;
  top: 0;
  width: ${(props) => (props.open ? `${DRAWER_WIDTH}px` : "auto")};
`;

const StyledIcon = withTheme(styled(PersonRoundedIcon)`
  width: 100px;
  min-height: 100px;
  color: ${(props) => props.theme.palette.textPrimary.main};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.palette.textPrimary.main};
  margin-bottom: 20px;
`);

const StyledLink = withTheme(styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  text-decoration: none;
  a {
    margin-left: 10px;
  }
`);

const StyledContainer = styled("div")`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  position: relative;
`;

const StyledIconButtonDecrease = withTheme(styled(
  FormatIndentDecreaseRoundedIcon
)`
  color: ${(props) => props.theme.palette.textPrimary.main};
`);

const StyledIconButtonIncrease = withTheme(styled(
  FormatIndentIncreaseRoundedIcon
)`
  color: ${(props) => props.theme.palette.textPrimary.main};
`);

const StyledProductsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

interface IProps {
  view: string;
  isOpenDrawer: boolean;
  onToggleMobileDrawer: () => void;
}

const Sidebar: FC<IProps> = ({ view, isOpenDrawer, onToggleMobileDrawer }) => {
  const user = useSelector(userSelector);
  const { firstName, lastName, patronymic, avatarUrl } = user;
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Данные успешно изменены!" : errorMessage;
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [isOpenCards, setOpenCards] = useState(true);
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { t } = useTranslation();
  const addPhoto = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const file = e?.target?.files?.[0];

      if (!file) return;

      const imagesRef = firebase.storage().ref().child("avatars/");
      const fileRef = imagesRef.child(file.name);

      await fileRef.put(file);

      const avatarUrl = await fileRef.getDownloadURL();
      const uid = currentUser?.uid;

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      db.ref().update({
        [`users/${uid}`]: {
          ...user,
          avatarUrl,
        },
      });

      dispatch(requestUser());
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    }
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const handleDrawerCollapse = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = () => {
    setOpenCards((isOpenCards) => !isOpenCards);
  };

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  return (
    <>
      {view === "desktop" ? (
        <StyledDrawer
          variant="permanent"
          open={open}
          width={DRAWER_WIDTH}
          view="desktop"
        >
          <StyledWrap open={open}>
            <StyledProfileInfo open={open}>
              <Grid container justify="center" alignItems="center">
                <StyledContainer>
                  {avatarUrl ? (
                    <UserAvatar avatarUrl={avatarUrl} />
                  ) : (
                    <StyledIcon sizes="large" />
                  )}
                  <AddAvatar addPhoto={addPhoto} />
                </StyledContainer>
                <Typography variant="h2" color="textPrimary" align="center">
                  {`${firstName} ${patronymic} ${lastName} `}
                </Typography>
              </Grid>
              <StyledLink to={ROUTES.PROFILE}>
                <CreateRoundedIcon color="action" />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  {t("Edit profile")}
                </Typography>
              </StyledLink>
            </StyledProfileInfo>
            <StyledProductsContainer>
              <List>
                <ListItem button onClick={handleClick}>
                  <CardIconItem />
                  <ListItemText>
                    {open ?? (
                      <Typography variant="h2" color="textPrimary">
                        {t("Cards")}
                      </Typography>
                    )}
                  </ListItemText>
                  {isOpenCards ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {user.isLoading ? (
                  <LinearProgress color="secondary" />
                ) : (
                  <Collapse in={isOpenCards} timeout="auto" unmountOnExit>
                    <CardsList open={open} />
                  </Collapse>
                )}
              </List>
              {open ? <DialogNewProduct /> : null}
            </StyledProductsContainer>
            <Grid container justify="center">
              <Tooltip title={open ? `${t("Hide")}` : `${t("Expand")}`} arrow>
                <IconButton onClick={handleDrawerCollapse}>
                  {open ? (
                    <StyledIconButtonDecrease />
                  ) : (
                    <StyledIconButtonIncrease />
                  )}
                </IconButton>
              </Tooltip>
            </Grid>
          </StyledWrap>
        </StyledDrawer>
      ) : (
        <StyledDrawer
          open={isOpenDrawer}
          onClose={onToggleMobileDrawer}
          view="mobile"
        >
          <StyledIconButton onClick={onToggleMobileDrawer}>
            <ChevronLeftIcon fontSize="large" />
          </StyledIconButton>
          <LanguageMobileSelect />
          <Link to={ROUTES.PROFILE}>
            {avatarUrl ? (
              <UserAvatar
                avatarUrl={avatarUrl}
                onToggleMobileDrawer={onToggleMobileDrawer}
              />
            ) : (
              <StyledIcon sizes="large" onClick={onToggleMobileDrawer} />
            )}
          </Link>
          <Typography variant="h1" color="textPrimary" align="center">
            {`${firstName} ${patronymic} ${lastName} `}
          </Typography>
          <AddAvatar addPhoto={addPhoto} />
          <StyledList>
            <ListItem button onClick={handleClick}>
              <CardIconItem />
              <ListItemText>
                <Typography variant="h1" color="textPrimary">
                  {t("Cards")}
                </Typography>
              </ListItemText>
              {isOpenCards ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpenCards} timeout="auto" unmountOnExit>
              <CardsList
                open={isOpenDrawer}
                onToggleMobileDrawer={onToggleMobileDrawer}
              />
            </Collapse>
          </StyledList>
        </StyledDrawer>
      )}
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertType} onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Sidebar;
