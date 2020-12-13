import React, { FC } from "react";
import { Offers } from "./Offers";
import { Operations } from "./Operations";
import { CurrencyRate } from "./CurrencyRate";

const MainPage: FC = () => (
  <>
    <Offers />
    <Operations />
    <CurrencyRate />
  </>
);

export default MainPage;
