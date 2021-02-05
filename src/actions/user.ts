import { REQUEST_USER, SAVE_USER } from "./constants";
import { IUser, IAction } from "../interfaces/redux";

export const requestUser = (): { type: string } => ({
  type: REQUEST_USER,
});

export const saveUser = (user: IUser): IAction<{ user: IUser }> => ({
  type: SAVE_USER,
  payload: {
    user,
  },
});
