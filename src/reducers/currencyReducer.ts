import { IAction } from "../interfaces/redux";
import { ICurrencyData } from "./../api/currency";
import { GET_CURRENCY_ERROR, SAVE_CURRENCY } from "./../actions/constants";

const requiredChars = ["USD", "EUR", "JPY", "CNY"];

const initialState = {
  currency: [],
  errorMessage: "",
};

export interface ICurrency {
  currency: {
    charCode: string;
    value: number;
    previous: number;
    id: string;
    name: string;
  }[];
  errorMessage: string;
}

export default (
  state: ICurrency = initialState,
  {
    type,
    payload,
  }: IAction<{ currency: ICurrencyData } | { errorMessage: string }>
): ICurrency => {
  switch (type) {
    case SAVE_CURRENCY:
      const { currency } = payload as { currency: ICurrencyData };
      return {
        ...state,
        currency: requiredChars.map((charCode) => ({
          charCode,
          value: currency.Valute[charCode].Value,
          previous: currency.Valute[charCode].Previous,
          id: currency.Valute[charCode].ID,
          name: currency.Valute[charCode].Name,
        })),
      };
    case GET_CURRENCY_ERROR:
      const { errorMessage } = payload as { errorMessage: string };
      return {
        ...state,
        errorMessage,
      };
    default:
      return state;
  }
};
