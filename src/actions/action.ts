import { SAVE_USER } from "./constants";

export interface IUser {
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
}

export const saveUser = (user: IUser): void => {
  type: SAVE_USER;
  payload: {
    user;
  }
};
