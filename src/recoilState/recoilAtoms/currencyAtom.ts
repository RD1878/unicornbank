import { atom } from "recoil";
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

const currencyState = atom<ICurrency>({
  key: "currencyState",
  default: {
    currency: [],
    errorMessage: "",
  },
  dangerouslyAllowMutability: true,
});

export default currencyState;
