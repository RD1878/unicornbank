import React, { ReactElement } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function getSize(size: string | undefined): string {
  switch (size) {
    case "large":
      return "width: 180px; height: 48px";
      break;

    default:
      return "width: 100px; height: 34px; font-size: 12px";
      break;
  }
}

const StyledButton = withTheme(styled(Button)`
  color: #fff;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 2em;
  font-weight: 600;
  ${(props) => getSize(props.size)};
`);

interface IPrimaryButton {
  size?: string;
  children: string | ReactElement;
}

export const PrimaryButton = ({
  children,
  ...rest
}: IPrimaryButton): React.ReactElement => (
  <StyledButton {...rest} variant="contained" color="secondary">
    {children}
  </StyledButton>
);
