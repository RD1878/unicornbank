import { ICurrencyChar } from "../recoilState/recoilAtoms/currencyAtom";

type TGetCurrencies = {
  currency1: ICurrencyChar | undefined;
  currency2: ICurrencyChar | undefined;
};

export const getCurrencies = (
  cardCurrency1: string,
  cardCurrency2: string,
  currency: ICurrencyChar[]
): TGetCurrencies => {
  const currency1 = currency.find(({ charCode }) => charCode === cardCurrency1);
  const currency2 = currency.find(({ charCode }) => charCode === cardCurrency2);

  return { currency1, currency2 };
};
