import React, { FC, useState, useEffect } from "react";
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

const APIURL = "https://www.cbr-xml-daily.ru/daily_json.js";

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

interface ISingleCurrency {
  CharCode: string;
  [key: string]: number | string;
}

interface ICurrencyInfo {
  date: string;
  rates: ISingleCurrency[];
}

const filterCurrencies = (data: { string: ISingleCurrency }) => {
  const requiredCurrencies = ["EUR", "USD", "JPY", "CNY"];
  return Object.values(data).filter((item) =>
    requiredCurrencies.includes(item.CharCode)
  );
};

export const CurrencyRate: FC = () => {
  const [currencyRates, setRates] = useState<ICurrencyInfo>(
    {} as ICurrencyInfo
  );
  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((res) => {
        const data = { rates: filterCurrencies(res.Valute), date: res.Date };
        res && setRates(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <Box mt={7} maxWidth={800}>
      <Typography variant="h1" color="textPrimary">
        Курсы валют ЦБ РФ
      </Typography>
      <Typography variant="body1" color="textSecondary">
        на {formatDate(currencyRates.date || new Date())}
      </Typography>
      <StyledContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="button">Валюта</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="button">Купить</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="button">Продать</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencyRates.rates &&
              currencyRates.rates.map((item) => (
                <TableRow key={item.ID}>
                  <TableCell component="th" scope="row">
                    {`${item.Name} (${item.CharCode})`}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color={
                        item.Value > item.Previous ? "secondary" : "textPrimary"
                      }
                    >
                      {item.Value}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{item.Previous}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledContainer>
    </Box>
  );
};
