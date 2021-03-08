import { ICard } from "./card";

export interface IUserCards {
  [key: string]: ICard;
}

export interface IUserProducts {
  cards: IUserCards;
}

export interface IHeadUserData {
  firstName: string;
  lastName: string;
  patronymic: string;
  avatarUrl: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  avatarUrl: string;
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
  products: IUserProducts;
  isAdmin: boolean;
}
