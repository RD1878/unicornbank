import { SAVE_USER } from "./constants";
import { IUser, IActionSaveUser } from "../interfaces/redux";

export const saveUser = (user: IUser): IActionSaveUser => ({
  type: SAVE_USER,
  payload: {
    user,
  },
});
