import React from "react";
import Button from "@material-ui/core/Button";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

const StyledButton = withTheme(styled(Button)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: #fff;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.25);
  padding: 1em 5.45em;
  border: 0;
  border-radius: 2em;

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`);

interface IPrimaryButton {
  children: string;
  [x: string]: any;
}

export const PrimaryButton = ({
  children,
  ...rest
}: IPrimaryButton): React.ReactElement => (
  <StyledButton {...rest}>{children}</StyledButton>
);
