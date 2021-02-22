import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICard } from "../../interfaces/card";
import { IOperation } from "../../interfaces/operation";
import TransactionsListHistoryPage from "../../organisms/TransactionsListHistoryPage";
import userState from "../../recoilState/recoilAtoms/userAtom";

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const History: FC = () => {
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const { products } = userData;
  const cards = Object.entries(products.cards);

  const allCardsTransactions = cards.reduce(
    (
      acc: { id: string; key: string; operation: IOperation }[],
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
    <StyledWraper>
      <Typography variant="h1" color="textPrimary">
        {`${t("Operations History")}`}
      </Typography>
      <TransactionsListHistoryPage cardsTransactions={allCardsTransactions} />
    </StyledWraper>
  );
};

export default History;
