import { IRootReducer } from "./../reducers";
import { IAuthSession } from "./../reducers/authReducer";

export const authSelector = ({ auth }: IRootReducer): IAuthSession => auth;
