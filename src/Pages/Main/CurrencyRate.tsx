import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import currencySelector from "../../recoilState/recoilSelectors/currencySelector";

const StyledContainer = withTheme(styled(TableContainer)`
  background-color: ${(props) => `${props.theme.palette.primary.main}50`};
  margin-top: 1.5rem;
`);

const formatDate = (date: string | Date): string => {
  const obj = new Date(date);
  return obj.toLocaleString(undefined, {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const CurrencyRate: FC = () => {
  const { currency } = useRecoilValue(currencySelector);
  const { t } = useTranslation();

  return (
    <Box mt={7} maxWidth={800}>
      <Typography variant="h1" color="textPrimary">
        {t("Currency rates")}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        на {formatDate(new Date())}
      </Typography>
      <StyledContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="button">Валюта</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="button">Продать</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="button">Купить</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currency.map(({ id, value, previous, charCode, name }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {`${name} (${charCode})`}
                </TableCell>
                <TableCell align="center">
                  <Typography
                    color={value > previous ? "secondary" : "textPrimary"}
                  >
                    {value}
                  </Typography>
                </TableCell>
                <TableCell align="center">{previous}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledContainer>
    </Box>
  );
};
