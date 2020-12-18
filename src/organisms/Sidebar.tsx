import React, { FC, useState } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Box, Avatar } from "@material-ui/core";
import { Link } from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CardItem from "./../atoms/CardItem";
import IconButton from "@material-ui/core/IconButton";
import FormatIndentDecreaseRoundedIcon from "@material-ui/icons/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRoundedIcon from "@material-ui/icons/FormatIndentIncreaseRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import { routes } from ".././routes";

interface IWithOpen {
  open: boolean;
}

interface IStyledDrawer extends IWithOpen {
  width: number;
}

const OPENED_DRAWER_WIDTH = 350;

const CARDS = [
  {
    title: "Текущий счет  **78",
    value: "1000, 45р",
  },
  {
    title: "Текущий зарплатный счет  **99",
    value: "9990, 45р",
  },
  {
    title: "Счет кредитной карты  **34",
    value: "9990, 45р",
  },
  {
    title: "Накопительный счет  **77",
    value: "199990, 45р",
  },
];

const StyledDrawer = withTheme(styled(Drawer)<IStyledDrawer>`
  & > div {
    position: relative;
    width: ${(props) => props.width}px;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
    overflow-y: unset;
    overflow-x: ${(props) => (props.open ? "unset" : "hidden")};
    width: ${(props) => (props.open ? props.width : props.theme.spacing(15))}px;
    transition: ${(props) =>
      props.theme.transitions.create("width", {
        easing: props.theme.transitions.easing.sharp,
        duration: props.open
          ? props.theme.transitions.duration.enteringScreen
          : props.theme.transitions.duration.leavingScreen,
      })};

    & > div {
      position: sticky;
      top: 0;
    }
  }
`);

const StyledProfileInfo = withTheme(styled(Box)<IWithOpen>`
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0)")};
  height: ${(props) => (props.open ? "auto" : 0)};
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  transition: ${(props) =>
    props.theme.transitions.create("all", {
      easing: props.theme.transitions.easing.sharp,
      duration: props.open
        ? props.theme.transitions.duration.enteringScreen
        : props.theme.transitions.duration.leavingScreen,
    })};
`);

const StyledAvatar = withTheme(styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`);

const StyledLink = withTheme(styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-left: 10px;
  }
`);

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerCollapse = () => {
    setOpen((prev) => !prev);
  };

  return (
    <StyledDrawer width={OPENED_DRAWER_WIDTH} variant="permanent" open={open}>
      <Box>
        <StyledProfileInfo open={open}>
          <Box m={3}>
            <Grid container direction="column" alignItems="center">
              <StyledAvatar sizes="large">H</StyledAvatar>
              <Typography variant="h2" color="textPrimary" align="center">
                Константинопальский Константин Константинович
              </Typography>
            </Grid>
          </Box>
          <StyledLink href={routes.main}>
            <CreateRoundedIcon color="action" />
            <Typography variant="body1" color="textSecondary" align="center">
              Редактировать профиль
            </Typography>
          </StyledLink>
        </StyledProfileInfo>
        <Box mt={5}>
          <List>
            {CARDS.map((card) => (
              <CardItem key={card.title} open={open} {...card} />
            ))}
          </List>
        </Box>
        <Grid container justify="center">
          <Tooltip title={open ? "Свернуть" : "Развернуть"} arrow>
            <IconButton onClick={handleDrawerCollapse}>
              {open ? (
                <FormatIndentDecreaseRoundedIcon />
              ) : (
                <FormatIndentIncreaseRoundedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
