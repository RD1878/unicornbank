/* eslint react/prop-types: 0 */
import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

const Container = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  min-width: 70px;
  min-height: calc(100vh - 100px);
  padding: 0px 30px;
  background-color: ${(props) => props.theme.palette.primary.main};
`);

const Sidebar: FC = () => {
  return <Container></Container>;
};

export default Sidebar;
