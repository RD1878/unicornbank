import React, { FC, ReactChild } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "@material-ui/core";

const StyledLink = withTheme(styled(Link)`
  display: block;
  position: relative;
  font-weight: ${
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (props) => props.fontWeight
  };
  padding: 5px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: ${(props) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      props.active === true
        ? props.theme.palette.active.main
        : props.theme.palette.secondary.main};
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

interface IPrimaryLink {
  children: ReactChild;
  href: string;
  active?: boolean;
  variant?: string;
  fontWeight?: number;
}

const PrimaryLink: FC<IPrimaryLink> = ({
  children,
  active = false,
  variant = "body1",
  fontWeight = 400,
  ...rest
}) => (
  <StyledLink
    color="textPrimary"
    variant={variant}
    active={active}
    fontWeight={fontWeight}
    className={active ? "active" : null}
    underline="none"
    {...rest}
  >
    {children}
  </StyledLink>
);

export default PrimaryLink;
