import { REQUEST_USER, SAVE_USER } from "./constants";
import { IUser, IActionSaveUser } from "../interfaces/redux";

export const requestUser = (): { type: string } => ({
  type: REQUEST_USER,
});

export const saveUser = (user: IUser): IActionSaveUser => ({
  type: SAVE_USER,
  payload: {
    user,
  },
});
