import React, { FC } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "@material-ui/core";
import { LinkProps } from "@material-ui/core/Link";

interface IPrimaryLink {
  href?: string;
  active?: boolean;
  variant?: string;
  fontWeight?: number;
  component?: string;
}

const StyledLink = withTheme(styled(Link)`
  display: block;
  position: relative;
  font-weight: ${(props: IPrimaryLink) => props.fontWeight};
  padding: 5px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.palette.active.main};
    opacity: 0;
    transform: translateY(5px);
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  &.active {
    color: ${(props) => props.theme.palette.active.main};

    &::after {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};

    &::after {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`);

const PrimaryLink: FC<IPrimaryLink & LinkProps> = ({
  children,
  component,
  active = false,
  variant = "body1",
  fontWeight = 400,
  ...LinkProps
}) => (
  <StyledLink
    component={component}
    color="textPrimary"
    variant={variant}
    active={active ? 1 : 0}
    fontWeight={fontWeight}
    className={active ? "active" : null}
    underline="none"
    {...LinkProps}
  >
    {children}
  </StyledLink>
);

export default PrimaryLink;
