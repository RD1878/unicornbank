import React, { FC } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CardInfoTitle, DialogActionCard } from "../../molecules";
import { PrimaryButton } from "../../atoms";
import TransactionsList from "../../organisms/TransactionsList";
import { IOperation } from "../../interfaces/operation";
import { IOperationItem } from "../../interfaces/operationItem";
import { useTranslation } from "react-i18next";
import { LinearProgress } from "@material-ui/core";
import { IParams } from "../../interfaces/params";
import { useRecoilValue } from "recoil";
import userState from "../../recoilState/recoilAtoms/userAtom";

const phrases = {
  block: "Block",
  confirmBlock: "Are you sure block",
  blocked: "Blocked message",
  reissue: "Reissue",
  confirmReissue: "Are you sure reissue",
  reissued: "Blocked message with reissue",
};

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
  const { id } = useParams<IParams>();
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const { isLoading, products } = userData;

  const currentCard = products.cards[id];

  const operations = currentCard?.operations ?? {};
  const currentCardOperations = Object.entries(operations);
  const currentCardTransactions = currentCardOperations.reduce(
    (acc: IOperationItem[], [key, operation]: [string, IOperation]) => [
      ...acc,
      { id, key, operation },
    ],
    []
  );

  return (
    <StyledWraper>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <CardInfoTitle currentCard={currentCard} />
          <StyledButtonsWraper>
            <DialogActionCard
              idCurrentCard={id}
              actionType={phrases.block}
              confirmType={phrases.confirmBlock}
              message={phrases.blocked}
            />
            <DialogActionCard
              idCurrentCard={id}
              actionType={phrases.reissue}
              confirmType={phrases.confirmReissue}
              message={phrases.reissued}
            />
            <StyledLink to={`/card/${id}/requisites`}>
              <StyledPrimaryButton>{t("Requisites")}</StyledPrimaryButton>
            </StyledLink>
          </StyledButtonsWraper>
          <TransactionsList cardsTransactions={currentCardTransactions} />
        </>
      )}
    </StyledWraper>
  );
};

export default CardInfo;
