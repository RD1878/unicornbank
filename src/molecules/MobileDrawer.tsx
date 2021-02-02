import React, { FC, useState } from "react";
import { Drawer, IconButton, withTheme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ROUTES } from "../routes";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const StyledDrawer = withTheme(styled(({ open, ...props }) => (
  <Drawer open={open} {...props} classes={{ paper: "paper" }} />
))`
  & .paper {
    position: relative;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
    overflow-y: unset;
    overflow-x: hidden;
    max-width: 400px;
    width: 100wv;
  }
`);

const MobileDrawer: FC = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <StyledDrawer open={isOpenDrawer} onClose={toggleDrawer}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Link to={ROUTES.PROFILE}>
          <IconButton edge="start" aria-label="open drawer">
            <AccountCircleRoundedIcon />
          </IconButton>
        </Link>
      </StyledDrawer>
    </>
  );
};

export default MobileDrawer;
