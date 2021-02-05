import { combineReducers } from "redux";
import { IUser } from "./../interfaces/redux";
import authReducer, { IAuthSession } from "./authReducer";
import userReducer from "./userReducer";
import currencyReducer, { ICurrency } from "./currencyReducer";

export interface IRootReducer {
  user: IUser;
  auth: IAuthSession;
  currency: ICurrency;
}

const rootReducer = combineReducers<IRootReducer>({
  user: userReducer,
  auth: authReducer,
  currency: currencyReducer,
});

export default rootReducer;
