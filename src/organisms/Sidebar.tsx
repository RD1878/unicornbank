import React, { FC, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import { Link } from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CardItem from "./../atoms/CardItem";
import IconButton from "@material-ui/core/IconButton";
import FormatIndentDecreaseRoundedIcon from "@material-ui/icons/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRoundedIcon from "@material-ui/icons/FormatIndentIncreaseRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { routes } from ".././routes";
interface IWithOpen {
  open: boolean;
}
interface ISidebar {
  fullName: string;
}

// const OPENED_DRAWER_WIDTH = 350;

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

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    paper: {
      position: "relative",
      overflowY: "unset",
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(15),
    },
  })
);

const StyledProfileInfo = withTheme(styled(Box)<IWithOpen>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`);

const StyledWrap = styled(Box)`
  position: sticky;
  top: 0;
`;

const StyledAvatar = withTheme(styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`);

const StyledLink = withTheme(styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  p {
    margin-left: 10px;
  }
`);

const Sidebar: FC<ISidebar> = ({ fullName }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerCollapse = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <StyledWrap>
        {open && (
          <StyledProfileInfo m={3}>
            <Grid container justify="center" alignItems="center">
              <StyledAvatar sizes="large">H</StyledAvatar>
              <Typography variant="h2" color="textPrimary" align="center">
                {fullName}
              </Typography>
            </Grid>
            <StyledLink href={routes.main}>
              <CreateRoundedIcon color="action" />
              <Typography variant="body1" color="textSecondary" align="center">
                Редактировать профиль
              </Typography>
            </StyledLink>
          </StyledProfileInfo>
        )}
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
      </StyledWrap>
    </Drawer>
  );
};

export default Sidebar;
