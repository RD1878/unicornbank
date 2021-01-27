import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CardInfoTitle, DialogBlockCard } from "../../molecules";
import { PrimaryButton } from "../../atoms";
import TransactionsList from "../../organisms/TransactionsList";
import { RouteComponentProps } from "@reach/router";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors";
import { IOperation } from "../../interfaces/opeartion";
import { DialogReissueCard } from "../../molecules";

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
  const currentCardOperations = Object.entries(operations);

  const currentCardTransactions = currentCardOperations.reduce(
    (
      acc: { id: string; key: string; operation: IOperation }[],
      [key, operation]: [string, IOperation]
    ) => {
      return [...acc, { id, key, operation }];
    },
    []
  );

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
        <DialogBlockCard idCurrentCard={id} />
        <DialogReissueCard idCurrentCard={id} />
        <StyledLink to={`/card/${id}/requisites`}>
          <StyledPrimaryButton>Реквизиты</StyledPrimaryButton>
        </StyledLink>
      </StyledButtonsWraper>
      <TransactionsList cardsTransactions={currentCardTransactions} />
    </StyledWraper>
  );
};

export default CardInfo;
