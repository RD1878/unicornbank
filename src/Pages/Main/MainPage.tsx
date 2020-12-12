import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { Offers } from "./Offers";
import { Operations } from "./Operations";
import { CurrencyRate } from "./CurrencyRate";

const MainPage: FC = () => (
  <>
    <Offers />

    <Typography variant="h1" color="textPrimary">
      Последние операции
    </Typography>

    <Operations />
    <CurrencyRate />
  </>
);

export default MainPage;
