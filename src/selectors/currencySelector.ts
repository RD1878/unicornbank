import { ICurrency } from "../reducers/currencyReducer";
import { IRootReducer } from "./../reducers";

export const currencySelector = ({ currency }: IRootReducer): ICurrency =>
  currency;
