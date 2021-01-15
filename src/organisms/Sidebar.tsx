import React, { FC, useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core/styles";
import {
  Box,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
} from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CardItem from "./../atoms/CardItem";
import IconButton from "@material-ui/core/IconButton";
import FormatIndentDecreaseRoundedIcon from "@material-ui/icons/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRoundedIcon from "@material-ui/icons/FormatIndentIncreaseRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { ROUTES } from ".././routes";
import { db } from "../firebase/firebase";
import { ICard } from "../interfaces/card";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../selectors/userSelector";
import { saveUser } from "../actions/action";

interface IWithOpen {
  open: boolean;
}
interface ISidebar {
  fullName: string;
  icon: null | HTMLImageElement;
}

const DRAWER_WIDTH = 350;

const StyledDrawer = withTheme(styled(({ open, width, ...props }) => (
  <Drawer classes={{ paper: "paper" }} open={open} width={width} {...props} />
))`
  & .paper {
    position: relative;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
    overflow-y: unset;
    overflow-x: hidden;
    width: ${(props) => (props.open ? props.width : props.theme.spacing(15))}px;
    transition: ${(props) =>
      props.theme.transitions.create("width", {
        easing: props.theme.transitions.easing.sharp,
        duration: props.open
          ? props.theme.transitions.duration.enteringScreen
          : props.theme.transitions.duration.leavingScreen,
      })};
  }
`);

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

const StyledListItem = styled(ListItem)`
  flex-direction: column;
`;

const StyledWrap = styled(Box)<IWithOpen>`
  position: sticky;
  top: 0;
  width: ${(props) => (props.open ? `${DRAWER_WIDTH}px` : "auto")};
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`;

const StyledIcon = withTheme(styled(PersonRoundedIcon)`
  width: 100px;
  min-height: 100px;
  color: ${(props) => props.theme.palette.textPrimary.main};
  border-radius: 50%;
  border 2px solid ${(props) => props.theme.palette.textPrimary.main};
`);

const StyledAddAvatar = withTheme(styled(AddAPhotoRoundedIcon)`
  color: ${(props) => props.theme.palette.textPrimary.main};
  position: absolute;
  right: -20px;
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

const Sidebar: FC<ISidebar> = ({ fullName, icon }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [isOpenCards, setOpenCards] = useState(true);
  const { products } = useSelector(userSelector);

  const getContactInfo = () => {
    db.ref("users/AXWUCpTAxhfHb7nWfoS2Nk7DqZa2")
      .once("value")
      .then((response) => {
        const data = response.val();
        dispatch(saveUser(data));
      });
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  const handleDrawerCollapse = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = () => {
    setOpenCards((isOpenCards) => !isOpenCards);
  };

  const matches = useMediaQuery("(max-width:1280px)");

  const isMatchMedia = () => (matches ? !open : open);

  return (
    <StyledDrawer
      variant="permanent"
      open={isMatchMedia()}
      width={DRAWER_WIDTH}
    >
      <StyledWrap open={isMatchMedia()}>
        <StyledProfileInfo open={isMatchMedia()}>
          <Grid container justify="center" alignItems="center">
            {icon ? (
              <StyledAvatar sizes="large">{icon}</StyledAvatar>
            ) : (
              <StyledContainer>
                <StyledIcon sizes="large" />
                <StyledAddAvatar />
              </StyledContainer>
            )}
            <Typography variant="h2" color="textPrimary" align="center">
              {fullName}
            </Typography>
          </Grid>
          <StyledLink to={ROUTES.PROFILE}>
            <CreateRoundedIcon color="action" />
            <Typography variant="body1" color="textSecondary" align="center">
              Редактировать профиль
            </Typography>
          </StyledLink>
        </StyledProfileInfo>
        <Box mt={5}>
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                {<PaymentRoundedIcon color="secondary" fontSize="large" />}
              </ListItemIcon>
              <ListItemText>
                {isMatchMedia() ? (
                  <Typography variant="h2" color="textPrimary">
                    Карты
                  </Typography>
                ) : null}
              </ListItemText>
              {isOpenCards ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpenCards} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItem button>
                  {products.cards.map((card: ICard) => (
                    <CardItem key={card.id} open={isMatchMedia()} {...card} />
                  ))}
                </StyledListItem>
              </List>
            </Collapse>
          </List>
        </Box>
        <Grid container justify="center">
          <Tooltip title={isMatchMedia() ? "Свернуть" : "Развернуть"} arrow>
            <IconButton onClick={handleDrawerCollapse}>
              {isMatchMedia() ? (
                <StyledIconButtonDecrease />
              ) : (
                <StyledIconButtonIncrease />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </StyledWrap>
    </StyledDrawer>
  );
};

export default Sidebar;
