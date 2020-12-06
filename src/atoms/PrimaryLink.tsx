import React, { ReactElement } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "@material-ui/core";

interface IPrimaryLink {
  href: string;
  children: string | ReactElement;
}

const StyledLink = withTheme(styled(Link)`
  display: block;
  position: relative;
  font-size: 14px;
  font-weight: 500;
  padding: 5px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.palette.secondary.main};
    opacity: 0;
    transform: translateY(5px);
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};

    &::after {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`);

export const PrimaryLink = ({
  children,
  ...rest
}: IPrimaryLink): ReactElement => (
  <StyledLink {...rest} color="textPrimary" underline="none">
    {children}
  </StyledLink>
);
