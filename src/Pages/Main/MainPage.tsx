import React, { FC } from "react";
import { Offers } from "../../molecules";
import { CurrencyRate } from "../../molecules";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors";
import ICardOperation from "../../interfaces/cardOpeartion";
import TransactionsList from "../../organisms/TransactionsList";
import { ICard } from "../../interfaces/card";

const MainPage: FC = () => {
  const { products } = useSelector(userSelector);

  const cardsTransactions = products.cards.reduce(
    (acc: ICardOperation[], card: ICard) => {
      return [...acc, ...card.operations];
    },
    []
  );

  return (
    <>
      <Offers />
      <TransactionsList operations={cardsTransactions} />
      <CurrencyRate />
    </>
  );
};

export default MainPage;
