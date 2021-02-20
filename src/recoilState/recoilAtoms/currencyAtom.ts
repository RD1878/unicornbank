import { atom, AtomEffect } from "recoil";
import api from "../../api";

export interface ICurrencyChar {
  charCode: string;
  value: number;
  previous: number;
  id: string;
  name: string;
}

export interface ICurrency {
  currency: ICurrencyChar[];
  errorMessage: string;
}

const requiredChars = ["USD", "EUR", "JPY", "CNY"];

const currencyEffect: AtomEffect<ICurrency> = ({ setSelf }) => {
  const getCurrency = async () => {
    try {
      const currencyData = await api.fetchCurrency();

      setSelf({
        currency: requiredChars.map((charCode) => ({
          charCode,
          value: currencyData.Valute[charCode].Value,
          previous: currencyData.Valute[charCode].Previous,
          id: currencyData.Valute[charCode].ID,
          name: currencyData.Valute[charCode].Name,
        })),
        errorMessage: "",
      });
    } catch ({ message }) {
      setSelf({
        currency: [],
        errorMessage: message,
      });
    }
  };
  getCurrency();
};

const currencyState = atom<ICurrency>({
  key: "currencyState",
  default: {
    currency: [],
    errorMessage: "",
  },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [currencyEffect],
});

export default currencyState;
