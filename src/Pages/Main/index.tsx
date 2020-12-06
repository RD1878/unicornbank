import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { PrimaryButton, PrimaryLink } from "../../atoms";
import { Offers } from "./Offers";
import { Operations } from "./Operations";

const TabContainer = styled.div`
  display: flex;
`;

export const MainPage: FC = () => {
  return (
    <>
      <Offers />

      <Typography variant="h1" color="textPrimary">
        Последние операции
      </Typography>

      <Operations />
    </>
  );
};
