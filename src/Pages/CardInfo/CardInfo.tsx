import React, { FC } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CardInfoTitle, DialogBlockCard } from "../../molecules";
import { PrimaryButton } from "../../atoms";
import TransactionsList from "../../organisms/TransactionsList";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors";
import { IOperation } from "../../interfaces/opeartion";
import { DialogReissueCard } from "../../molecules";
import { IOperationsItem } from "../../interfaces/operationsItem";

const StyledButtonsWraper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1200px;
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

const CardInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
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
    (acc: IOperationsItem[], [key, operation]: [string, IOperation]) => [
      ...acc,
      { id, key, operation },
    ],
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
