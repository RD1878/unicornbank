import React, { FC, useEffect /* , useState */ } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CardInfoTitle, DialogBlockCard } from "../../molecules";
import { PrimaryButton } from "../../atoms";
import TransactionsList from "../../organisms/TransactionsList";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../selectors";
import { IOperation } from "../../interfaces/operation";
import { DialogReissueCard } from "../../molecules";
import { IOperationItem } from "../../interfaces/operationItem";
import { useTranslation } from "react-i18next";
/* import { Box, LinearProgress, Typography } from "@material-ui/core";
 */ import { requestUser /* , saveUser */ } from "../../actions/user";

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
  const { t } = useTranslation();
  const { isLoading, products } = useSelector(userSelector);
  const currentCard = products.cards[id];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestUser());
    /* console.log(isLoading, "Юзэффект"); */
  }, []);

  const a = currentCard?.operations ?? {};
  const currentCardOperations = Object.entries(a);
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
        <div>Загрузка</div>
      ) : (
        <>
          <CardInfoTitle currentCard={currentCard} />
          <StyledButtonsWraper>
            <DialogBlockCard idCurrentCard={id} />
            <DialogReissueCard idCurrentCard={id} />
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
