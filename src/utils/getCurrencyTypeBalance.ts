const getCurrencyTypeBalance = (balance: number, currency: string): string =>
  `${balance.toLocaleString("ru-Ru", {
    style: "currency",
    currency: `${currency}`,
  })}`;

export default getCurrencyTypeBalance;
