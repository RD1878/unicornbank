import React, { FC } from "react";
import { Payments, CurrencyRate } from "../../molecules";
import { IOperation } from "../../interfaces/operation";
import TransactionsList from "../../organisms/TransactionsList";
import { ICard } from "../../interfaces/card";
import { useRecoilValue } from "recoil";
import userState from "../../recoilState/recoilAtoms/userAtom";

const MainPage: FC = () => {
  const { userData } = useRecoilValue(userState);
  const { products } = userData;
  const cards = Object.entries(products?.cards ?? {});
  const allCardsTransactions = cards
    .reduce(
      (
        acc: { id: string; key: string; operation: IOperation }[],
        [id, card]: [string, ICard]
      ) => {
        const operations = Object.entries(card?.operations ?? {});
        for (const [key, operation] of operations) {
          acc = [...acc, { id, key, operation }];
        }
        return acc;
      },
      []
    )
    .slice(-5);

  return (
    <>
      <Payments />
      <TransactionsList cardsTransactions={allCardsTransactions} />
      <CurrencyRate />
    </>
  );
};
export default MainPage;
