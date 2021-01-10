import { SAVE_USER } from "./constants";

export interface IUser {
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
}

interface IActionSaveUser {
  type: string;
  payload: {
    user: IUser;
  };
}

export const saveUser = (user: IUser): IActionSaveUser => ({
  type: SAVE_USER,
  payload: {
    user,
  },
});
