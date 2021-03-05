import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import Tooltip from "@material-ui/core/Tooltip";
import getCurrencyTypeBalance from "../utils/getCurrencyTypeBalance";
import { useTranslation } from "react-i18next";

interface ICardItem {
  number: string;
  balance: number;
  currency: string;
  open: boolean;
}

const StyledListItem = withTheme(styled(ListItem)<ICardItem>`
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => (props.open ? "row" : "column")};
`);

const StyledColumn = withTheme(styled("div")<ICardItem>`
  p {
    margin-right: ${(props) => (props.open ? "20px" : "0")};
    text-align: ${(props) => (props.open ? "left" : "center")};
  }
`);

const CardItem: FC<ICardItem> = ({ number, balance, currency, open }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={`${t("Card")} ${number}`} arrow>
      <StyledListItem button open={open}>
        <StyledColumn open={open}>
          <Typography
            variant={open ? "body2" : "body1"}
            color="textPrimary"
            align="left"
          >
            {getCurrencyTypeBalance(balance, currency)}
          </Typography>
          {open && (
            <Typography variant="body1" color="textSecondary" align="left">
              {`${t("Card")} ${number}`}
            </Typography>
          )}
        </StyledColumn>
        <PaymentRoundedIcon
          color="secondary"
          fontSize={open ? "default" : "large"}
        />
      </StyledListItem>
    </Tooltip>
  );
};

export default CardItem;
