import React, { FC } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import styled from "styled-components";
import { COLORS } from "../theme";

const StyledButton = styled(Button)`
  background-color: ${COLORS.ORANGE};
  color: ${COLORS.WHITE};
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.25);
  padding: 1em 5em;
  border: 0;
  border-radius: 2em;

  &:hover {
    background-color: ${COLORS.ORANGE};
  }
`;

const PrimaryButton: FC<ButtonProps> = (props) => <StyledButton {...props} />;

export default PrimaryButton;
