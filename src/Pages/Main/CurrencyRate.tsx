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

function createData(name: string, buy: number, sell: number) {
  return { name, buy, sell };
}

const StyledContainer = withTheme(styled(TableContainer)`
  background-color: ${(props) => `${props.theme.palette.primary.main}50`};
`);

const rows = [
  createData("Доллар (USD)", 159, 6.0),
  createData("Евро", 237, 9.0),
  createData("Йена", 262, 16.0),
  createData("Юань", 262, 16.0),
];

export const CurrencyRate: FC = () => {
  return (
    <Box mt={7}>
      <Typography variant="h1" color="textPrimary">
        Курсы валют
      </Typography>
      <StyledContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Валюта</TableCell>
              <TableCell align="center">Покупка</TableCell>
              <TableCell align="center">Продажа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.buy}</TableCell>
                <TableCell align="center">{row.sell}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledContainer>
    </Box>
  );
};
