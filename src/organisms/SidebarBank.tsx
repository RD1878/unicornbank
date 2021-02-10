import React, { FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { DRAWER_BANKCHATS_WIDTH } from "../constants";

const StyledDrawer = withTheme(styled(({ open, width, anchor, ...props }) => (
  <Drawer
    classes={{ paper: "paper" }}
    open={open}
    width={width}
    anchor={anchor}
    {...props}
  />
))`
  & .paper {
    position: absolute;
    top: 0;
    background-color: ${(props) => props.theme.palette.primary.main};
    overflow-y: unset;
    overflow-x: hidden;
    width: ${(props) => props.width}px;
  }
`);

const SidebarBank: FC = () => {
  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      width={DRAWER_BANKCHATS_WIDTH}
    ></StyledDrawer>
  );
};

export default SidebarBank;
