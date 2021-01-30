import React, { FC } from "react";
import styled from "styled-components";
import { Avatar, Box, Card, Typography } from "@material-ui/core";
import { IOperation } from "../interfaces/operation";
import getCurrencyTypeBalance from "../utils/getCurrencyTypeBalance";
import { withTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

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

interface IProps {
  operation: IOperation;
}

const OperationCard: FC<IProps> = ({ operation }) => {
  const { t } = useTranslation();
  const { amount, category, currency, date, name, type } = operation;
  const formatDate = (date: string): string => {
    const obj = new Date(date);
    switch (i18next.language) {
      case "tat":
        return obj.toLocaleDateString("tt", {
          month: "numeric",
          year: "numeric",
          day: "numeric",
        });
      case "en":
        return obj.toLocaleDateString("en-Us", {
          month: "long",
          weekday: "long",
          day: "numeric",
        });
      default:
        return obj.toLocaleDateString("ru-Ru", {
          month: "long",
          weekday: "long",
          day: "numeric",
        });
    }
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
            {t(category)}
          </TypographyDescription>
        </StyledBox>
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
