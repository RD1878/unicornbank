import { CircularProgress, withTheme } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

const LoadingContainer = withTheme(styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.primary.light};
`);

const PrimaryLoader: FC = () => {
  return (
    <LoadingContainer>
      <CircularProgress color="secondary" />
    </LoadingContainer>
  );
};

export default PrimaryLoader;
