import { selector } from "recoil";
import { fetchCurrency } from "../../api";
import currencyState, { ICurrency } from "../recoilAtoms/currencyAtom";

const requiredChars = ["USD", "EUR", "JPY", "CNY"];

export const currencySelector = selector<ICurrency>({
  key: "currencySelector",
  get: async ({ get }) => {
    try {
      const data = get(currencyState);
      const currencyData = await fetchCurrency();

      return {
        ...data,
        currency: requiredChars.map((charCode) => ({
          charCode,
          value: currencyData.Valute[charCode].Value,
          previous: currencyData.Valute[charCode].Previous,
          id: currencyData.Valute[charCode].ID,
          name: currencyData.Valute[charCode].Name,
        })),
        errorMessage: "",
      };
    } catch ({ message }) {
      return {
        currency: [],
        errorMessage: message,
      };
    }
  },
});

export default currencySelector;
