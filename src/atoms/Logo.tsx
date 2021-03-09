import React, { FC } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { ReactComponent as LogoSVG } from "../assets/images/logo.svg";

interface ILogo {
  width?: string;
}
const LogoContainer = withTheme(styled("div")`
  margin-right: 10px;
  & svg path.changeable {
    fill: ${(props) => props.theme.palette.textPrimary.main};
  }
`);

const Logo: FC<ILogo> = ({ width }) => (
  <LogoContainer>
    <LogoSVG width={width || 100} />
  </LogoContainer>
);

export default Logo;
