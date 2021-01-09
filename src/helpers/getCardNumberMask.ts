const cardNumberMask = (num: number): string =>
  `${String(num).slice(0, 4)} **** **** ${String(num).slice(-4)}`;

export default cardNumberMask;
