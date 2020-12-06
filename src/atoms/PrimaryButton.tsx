import React, { ReactElement } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

function getSize(size: string | undefined): string {
  switch (size) {
    case "large":
      return "width: 180px; height: 48px";
      break;

    default:
      return "height: 36px; font-size: 12px";
      break;
  }
}

const StyledButton = withTheme(styled(Button)`
  color: #fff;
  font-weight: 600;
  padding: 5px 30px;
  border-radius: 2em;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.25);
  ${(props) => getSize(props.size)};
`);

interface IPrimaryButton {
  children: string | ReactElement;
  size?: string;
}

export const PrimaryButton = ({
  children,
  ...rest
}: IPrimaryButton): React.ReactElement => (
  <StyledButton {...rest} variant="contained" color="secondary">
    <Typography variant="button">{children}</Typography>
  </StyledButton>
);
