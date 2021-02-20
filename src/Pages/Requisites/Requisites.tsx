import React, { FC } from "react";
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
import { IParams } from "../../interfaces/params";
import { useRecoilValue } from "recoil";
import userState from "../../recoilState/recoilAtoms/userAtom";
import {
  BANKOFRECIPIENT,
  BIK,
  CORRESPONDENTACCOUNT,
  INN,
  KPP,
} from "../../constants";

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
  const { id } = useParams<IParams>();
  const { userData } = useRecoilValue(userState);
  const { products } = userData;
  const currentCard = products.cards[id];
  const { number, requisites } = currentCard;
  const { account, purposeOfPayment, recipient } = requisites;

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
      value: BIK,
    },
    {
      name: "Банк получатель",
      value: BANKOFRECIPIENT,
    },
    {
      name: "Корреспондентский счет",
      value: CORRESPONDENTACCOUNT,
    },
    {
      name: "ИНН",
      value: INN,
    },
    {
      name: "КПП",
      value: KPP,
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
