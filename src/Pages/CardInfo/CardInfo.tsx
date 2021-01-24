import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CardInfoTitle, DialogReissue } from "../../molecules";
import { PrimaryButton } from "../../atoms";
import TransactionsList from "../../organisms/TransactionsList";
import { RouteComponentProps } from "@reach/router";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors";

const StyledButtonsWraper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1200px;
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 265px;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
`;

interface IMatchId extends RouteComponentProps {
  match: {
    params: {
      id: string;
    };
  };
}

const CardInfo: FC<IMatchId> = ({ match }) => {
  const id = match.params.id;
  const { products } = useSelector(userSelector);
  const currentCard = products.cards[id];
  const {
    balance,
    currency,
    isActive,
    validity,
    number,
    operations,
  } = currentCard;
  const cardOperations = Object.values(operations);

  return (
    <StyledWraper>
      <CardInfoTitle
        balance={balance}
        currency={currency}
        isActive={isActive}
        validity={validity}
        number={number}
      />
      <StyledButtonsWraper>
        <StyledPrimaryButton>Заблокировать карту</StyledPrimaryButton>
        <DialogReissue /* idCurrentCard={id} */ />
        <StyledLink to={`/card/${id}/requisites`}>
          <StyledPrimaryButton>Реквизиты</StyledPrimaryButton>
        </StyledLink>
      </StyledButtonsWraper>
      <TransactionsList operations={cardOperations} />
    </StyledWraper>
  );
};

export default CardInfo;
