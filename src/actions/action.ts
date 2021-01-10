import { SAVE_USER } from "./constants";

export interface IUser {
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
}

interface IArgument {
  type: string;
  payload: {
    user: IUser;
  };
}

export const saveUser = (user: IUser): IArgument => ({
  type: SAVE_USER,
  payload: {
    user,
  },
});
