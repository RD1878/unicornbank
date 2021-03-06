import ICategories from "./interfaces/categories";
import { getEndToday } from "./utils/getEndToday";
export const SHACKBAR_SHOW_DURATION = 6000;

export const CURRENCIES = {
  RUB: "Rubles",
  USD: "Dollar",
  EUR: "Euro",
};
export const PHONE_BANK = "8 800 555-35-35";

export const EMAIL_BANK = "mailto:unicorn@email.com";

export const REQUIRED_MESSAGE = "Required";
export const KPP = 363354378;
export const INN = 562645787591;
export const BIK = 509339151;
export const BANKOFRECIPIENT = 'АО "Юни Корн Банк"';
export const CORRESPONDENTACCOUNT = "36002524538195927000";

export const DRAWER_WIDTH = 350;

export const NOT_A_LETTER = /[^0-9.]*/g;

export enum ELEMENT {
  loginEmail = "login-email",
  password = "password",
  loginButton = "login-button",
}

export const CATEGORIES: ICategories[] = [
  { type: "all", name: "All" },
  { type: "income", name: "Incomes" },
  { type: "writeOff", name: "Write off" },
];

const SEVENDAYSINMILLISECONDS = 691199999;

export const sevenDaysAgo = new Date(
  getEndToday().getTime() - SEVENDAYSINMILLISECONDS
);
