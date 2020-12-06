import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { Avatar, Box, Card, Typography } from "@material-ui/core";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
`;

interface IOperationCard {
  children?: ReactElement;
  isIncome?: boolean;
}

export const OperationCard: FC<IOperationCard> = ({ isIncome = false }) => {
  return (
    <Box my={3}>
      <Typography variant="caption" color="textSecondary">
        23 августа, понедельник
      </Typography>
      <StyledCard>
        <Avatar>И</Avatar>
        <Box>
          <Typography variant="button">ИВАН ИВАНОВИЧ И.</Typography>
          <Typography variant="body1" color="textSecondary">
            Получение перевода
          </Typography>
        </Box>
        <Typography variant="h2" color={isIncome ? "secondary" : "textPrimary"}>
          {!isIncome && "-"}32 000, 22р
        </Typography>
      </StyledCard>
    </Box>
  );
};
