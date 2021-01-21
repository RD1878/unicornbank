import { combineReducers } from "redux";
import { IUser } from "./../interfaces/redux";
import authReducer, { IAuthSession } from "./authReducer";
import userReducer from "./userReducer";

export interface IRootReducer {
  user: IUser;
  auth: IAuthSession;
}

const rootReducer = combineReducers<IRootReducer>({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
