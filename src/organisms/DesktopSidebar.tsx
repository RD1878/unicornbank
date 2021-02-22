import {
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, FC } from "react";
import { AddAvatar, CardIconItem, UserAvatar } from "../atoms";
import { DRAWER_WIDTH } from "../constants";
import { ROUTES } from "../routes";
import {
  StyledContainer,
  StyledDrawer,
  StyledIcon,
  StyledIconButtonDecrease,
  StyledIconButtonIncrease,
  StyledLink,
  StyledProductsContainer,
  StyledProfileInfo,
  StyledWrap,
} from "./SidebarComponents";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { useTranslation } from "react-i18next";
import { CardsList, DialogNewProduct } from "../molecules";

interface IProps {
  open: boolean;
  avatarUrl: string;
  addPhoto: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  firstName: string;
  lastName: string;
  patronymic: string;
  isOpenCards: boolean;
  isLoading: boolean;
  handleDrawerCollapse: () => void;
  handleClick: () => void;
}

const DesktopSidebar: FC<IProps> = ({
  open,
  avatarUrl,
  addPhoto,
  firstName,
  lastName,
  patronymic,
  isOpenCards,
  isLoading,
  handleDrawerCollapse,
  handleClick,
}) => {
  const { t } = useTranslation();

  return (
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
            <Typography variant="body1" color="textSecondary" align="center">
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
            {isLoading ? (
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
  );
};

export default DesktopSidebar;
