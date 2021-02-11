import { IUserProducts } from "../interfaces/redux";
import { ICurrencyChar } from "../reducers/currencyReducer";

export const findCardId = (
  cardNumber: string,
  products: IUserProducts
): string => {
  const idsArray = Object.keys(products.cards);

  return idsArray.find(
    (key: string) => products.cards[key].number === cardNumber
  ) as string;
};

interface IProps {
  sum: string;
  cardCurrency1: string;
  cardCurrency2: string;
  currency1: ICurrencyChar | undefined;
  currency2: ICurrencyChar | undefined;
}

export const calculateOfTransfer = ({
  sum,
  cardCurrency1,
  cardCurrency2,
  currency1,
  currency2,
}: IProps): number => {
  const value = Number(sum);

  // Если переводим в рубли нерубли
  if (cardCurrency2 === "RUB" && currency1) {
    return value * currency1.value;
  }

  if (!currency1 && currency2) return value / currency2.previous;
  if (!currency1 || !currency2) return value;

  if (cardCurrency1 === cardCurrency2) {
    return value;
  }

  if (cardCurrency1 === "EUR" || cardCurrency1 === "USD") {
    return (value * currency1.value) / currency2.previous;
  }

  return (value * currency1.previous) / currency2.previous;
};
