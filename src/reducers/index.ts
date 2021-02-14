import { combineReducers } from "redux";
import { IUser } from "./../interfaces/redux";
import authReducer, { IAuthSession } from "./authReducer";
import userReducer from "./userReducer";
import { IChatMessage } from "../interfaces/redux";
import chatMessagesReducer from "./chatMessagesReducer";

export interface IRootReducer {
  user: IUser;
  auth: IAuthSession;
  chatMessages: IChatMessage[];
}

const rootReducer = combineReducers<IRootReducer>({
  user: userReducer,
  auth: authReducer,
  chatMessages: chatMessagesReducer,
});

export default rootReducer;
