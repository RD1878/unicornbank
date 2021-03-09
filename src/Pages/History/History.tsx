import { Typography } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICard } from "../../interfaces/card";
import { IOperation } from "../../interfaces/operation";
import TransactionsList from "../../organisms/TransactionsList";
import userState from "../../recoilState/recoilAtoms/userAtom";

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const History: FC = () => {
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const cards = Object.entries(userData.products?.cards ?? {});
  const { pathname } = useLocation();

  const allCardsTransactions = cards
    .reduce(
      (
        acc: { id: string; key: string; operation: IOperation }[],
        [id, card]: [string, ICard]
      ) => {
        const operations = Object.entries(card.operations ?? {});
        for (const [key, operation] of operations) {
          acc = [...acc, { id, key, operation }];
        }
        return acc;
      },
      []
    )
    .sort(
      (itemA, itemB) =>
        Date.parse(itemB.operation.date) - Date.parse(itemA.operation.date)
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StyledWraper>
      <Typography variant="h1" color="textPrimary">
        {`${t("Operations History")}`}
      </Typography>
      <TransactionsList cardsTransactions={allCardsTransactions} />
    </StyledWraper>
  );
};

export default History;
