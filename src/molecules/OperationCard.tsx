import React, { FC } from "react";
import styled from "styled-components";
import { IOperation } from "../interfaces/operation";
import { Avatar, Box, Card, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const StyledCard = withTheme(styled(Card)`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 8px 10px;
  }
`);

const TypographyName = withTheme(styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

const TypographyDescription = withTheme(styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

const StyledBox = withTheme(styled(Box)`
  margin-left: 40px;
  width: 100%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 10px;
    width: calc(100% - 130px);
    margin-right: auto;
  }
`);

interface IOperationCard {
  operation: IOperation;
}

const OperationCard: FC<IOperationCard> = ({ operation }) => {
  const { name, type, date, description, amount, currency } = operation;

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
        <StyledBox>
          <TypographyName variant="button">{name}</TypographyName>
          <TypographyDescription variant="body1" color="textSecondary">
            {description}
          </TypographyDescription>
        </StyledBox>
        <Typography
          variant="h2"
          color={type === "income" ? "secondary" : "textPrimary"}
          align="right"
        >
          {type === "expense" && "-"}
          {amount.toLocaleString()}
          {currency}
        </Typography>
      </StyledCard>
    </Box>
  );
};

export default OperationCard;
