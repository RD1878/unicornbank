import { GET_CURRENCY, GET_CURRENCY_ERROR, SAVE_CURRENCY } from "./constants";
import { ICurrencyData } from "./../api/currency";
import { IAction } from "./../interfaces/redux";

export const getCurrency = (): { type: string } => ({
  type: GET_CURRENCY,
});

export const saveCurrency = (
  currency: ICurrencyData
): IAction<{ currency: ICurrencyData }> => ({
  type: SAVE_CURRENCY,
  payload: {
    currency,
  },
});

export const getCurrencyError = (
  errorMessage = ""
): IAction<{ errorMessage: string }> => ({
  type: GET_CURRENCY_ERROR,
  payload: { errorMessage },
});
