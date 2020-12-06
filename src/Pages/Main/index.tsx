import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { PrimaryButton, PrimaryLink } from "../../atoms";
import { OperationCard } from "../../molecules";
import { Offers } from "./Offers";

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
      <TabContainer>
        <PrimaryLink variant="h2" href="#" active={true}>
          Все
        </PrimaryLink>
        <PrimaryLink variant="h2" href="#">
          Товары и услуги
        </PrimaryLink>
        <PrimaryLink variant="h2" href="#">
          Развлечения
        </PrimaryLink>
      </TabContainer>

      <OperationCard />
      <OperationCard />
      <OperationCard />
    </>
  );
};
