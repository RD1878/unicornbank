export const findBothCurrencies = (
  cardCurrency1: string,
  cardCurrency2: string
): boolean => {
  return (
    (cardCurrency1 === "USD" && cardCurrency2 === "EUR") ||
    (cardCurrency1 === "EUR" && cardCurrency2 === "USD")
  );
};
