import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";
import styled from "styled-components";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";

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

const CardInfoTitle: FC = () => {
  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {`Дебетовая карта *1234`}
      </Typography>
      <StyledCardInfoContainer>
        <StyledPaymentRoundedIcon color="secondary" />
        <StyledCardDataContainer>
          <Typography variant="body1" color="textPrimary">
            {`Срок действия до 12/25`}
          </Typography>
          <Typography variant="h1" color="textPrimary">
            {`25 000,00 руб`}
          </Typography>
        </StyledCardDataContainer>
      </StyledCardInfoContainer>
    </>
  );
};

export default CardInfoTitle;
