import React, { FC } from "react";
import styled from "styled-components";
import { Avatar, Box, Card, Typography } from "@material-ui/core";
import { IOperation } from "../interfaces/opeartion";
import getCurrencyTypeBalance from "../utils/getCurrencyTypeBalance";

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 20px 30px;
`;

interface IProps {
  operation: IOperation;
}

const OperationCard: FC<IProps> = ({ operation }) => {
  const { amount, category, currency, date, name, type } = operation;
  const formatDate = (date: string): string => {
    const obj = new Date(date);
    return obj.toLocaleDateString(undefined, {
      month: "long",
      weekday: "long",
      day: "numeric",
    });
  };

  return (
    <Box my={3}>
      <Typography variant="caption" color="textSecondary">
        {formatDate(date)}
      </Typography>
      <StyledCard>
        <Avatar>{name.slice(0, 1)}</Avatar>
        <Box ml={5} width="100%">
          <Typography variant="button">{name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {category}
          </Typography>
        </Box>
        <Typography
          variant="h2"
          color={type === "income" ? "secondary" : "textPrimary"}
          align="right"
        >
          {type === "writeOff" && "-"}
          {getCurrencyTypeBalance(amount, currency)}
        </Typography>
      </StyledCard>
    </Box>
  );
};

export default OperationCard;
