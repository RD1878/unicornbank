import { ICurrencyChar } from "../recoilState/recoilAtoms/currencyAtom";

interface IGetCurrencies {
  cardCurrency1: string;
  cardCurrency2: string;
  currency: ICurrencyChar[];
}

export const getCurrencies = ({
  cardCurrency1,
  cardCurrency2,
  currency,
}: IGetCurrencies): {
  currency1: ICurrencyChar | undefined;
  currency2: ICurrencyChar | undefined;
} => {
  const currency1 = currency.find(({ charCode }) => charCode === cardCurrency1);

  const currency2 = currency.find(({ charCode }) => charCode === cardCurrency2);

  return { currency1, currency2 };
};
