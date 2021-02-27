import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";
import styled from "styled-components";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import getCurrencyTypeBalance from "../utils/getCurrencyTypeBalance";
import { useTranslation } from "react-i18next";
import { ICard } from "../interfaces/card";

const StyledCardInfoContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

const StyledPaymentRoundedIcon = styled(PaymentRoundedIcon)`
  font-size: 100px;
`;

const StyledCardDataContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const StyledWraper = styled("div")`
  margin-bottom: 20px;
`;

interface IProps {
  currentCard: ICard;
}

const CardInfoTitle: FC<IProps> = ({ currentCard }) => {
  const { balance, number, currency, isActive, validity } = currentCard;
  const { t } = useTranslation();
  return (
    <StyledWraper>
      <Typography variant="h1" color="textPrimary">
        {`${t("Debit card")}\u00A0\u00A0${number.slice(-7)}`}
      </Typography>
      <StyledCardInfoContainer>
        <StyledPaymentRoundedIcon color="secondary" />
        <StyledCardDataContainer>
          <Typography variant="body1" color="textPrimary">
            {`${t("Validity")} ${String(validity.month).padStart(2, "0")}/${
              validity.year
            }`}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {isActive ? t("Active") : t("Blocked")}
          </Typography>
          <Typography variant="h1" color="textPrimary">
            {getCurrencyTypeBalance(balance, currency)}
          </Typography>
        </StyledCardDataContainer>
      </StyledCardInfoContainer>
    </StyledWraper>
  );
};

export default CardInfoTitle;
