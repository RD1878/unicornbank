import React, { FC } from "react";
import { Payments } from "./Payments";
import { Operations } from "./Operations";
import { CurrencyRate } from "./CurrencyRate";

const MainPage: FC = () => (
  <>
    <Payments />
    <Operations />
    <CurrencyRate />
  </>
);

export default MainPage;
