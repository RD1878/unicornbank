import { Box, Drawer, IconButton, List, withTheme } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import FormatIndentDecreaseRoundedIcon from "@material-ui/icons/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRoundedIcon from "@material-ui/icons/FormatIndentIncreaseRounded";

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

const StyledIcon = withTheme(styled(PersonRoundedIcon)`
  width: 100px;
  min-height: 100px;
  color: ${(props) => props.theme.palette.textPrimary.main};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.palette.textPrimary.main};
  margin-bottom: 20px;
`);

interface IWithOpen {
  open: boolean;
}

import { DRAWER_WIDTH } from "../constants";
import { Link } from "react-router-dom";

const StyledWrap = styled(Box)<IWithOpen>`
  position: sticky;
  top: 0;
  width: ${(props) => (props.open ? `${DRAWER_WIDTH}px` : "auto")};
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

const StyledContainer = styled("div")`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  position: relative;
`;

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

const StyledProductsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
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

export {
  StyledDrawer,
  StyledIconButton,
  StyledList,
  StyledIcon,
  StyledWrap,
  StyledProfileInfo,
  StyledContainer,
  StyledLink,
  StyledProductsContainer,
  StyledIconButtonDecrease,
  StyledIconButtonIncrease,
};
