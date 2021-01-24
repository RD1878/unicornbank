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
  const cards = Object.entries(products.cards);
  const allCardsTransactions = cards.reduce(
    (
      acc: { id: string; key: string; operation: ICardOperation }[],
      [id, card]: [string, ICard]
    ) => {
      const operations = Object.entries(card.operations);
      for (const [key, operation] of operations) {
        acc = [...acc, { id, key, operation }];
      }
      return acc;
    },
    []
  );

  return (
    <>
      <Offers />
      <TransactionsList cardsTransactions={allCardsTransactions} />
      <CurrencyRate />
    </>
  );
};

export default MainPage;
