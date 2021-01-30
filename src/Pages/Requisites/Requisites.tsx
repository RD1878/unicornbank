import React, { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { PrimaryButton } from "../../atoms";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

const StyledTable = styled(Table)`
  margin-top: 30px;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 600;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 20px;
  align-self: center;
`;

const Requisites: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector(userSelector);
  const currentCard = products.cards[id];
  const { number, requisites } = currentCard;
  const {
    account,
    bankOfRecipient,
    bik,
    correspondentAccount,
    inn,
    kpp,
    purposeOfPayment,
    recipient,
  } = requisites;

  const rows = [
    {
      name: "Получатель",
      value: recipient,
    },
    {
      name: "Счет получателя",
      value: account,
    },
    {
      name: "Назначение платежа",
      value: purposeOfPayment,
    },
    {
      name: "БИК",
      value: bik,
    },
    {
      name: "Банк получатель",
      value: bankOfRecipient,
    },
    {
      name: "Корреспондентский счет",
      value: correspondentAccount,
    },
    {
      name: "ИНН",
      value: inn,
    },
    {
      name: "КПП",
      value: kpp,
    },
  ];

  return (
    <StyledWraper>
      <Typography variant="h1" color="textPrimary">
        {`${t("Details for transfer")}\u00A0\u00A0${number.slice(-7)}`}
      </Typography>
      <StyledTable>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <StyledTableCell align="right">{row.value}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <StyledPrimaryButton>{t("Send email")}</StyledPrimaryButton>
    </StyledWraper>
  );
};

export default Requisites;
