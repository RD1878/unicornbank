import { combineReducers } from "redux";
import { IUser } from "./../interfaces/redux";
import authReducer, { IAuthSession } from "./authReducer";
import userReducer from "./userReducer";
import { IChatMessages } from "../interfaces/redux";
import chatMessagesReducer from "./chatMessagesReducer";

export interface IRootReducer {
  user: IUser;
  auth: IAuthSession;
  chatMessages: IChatMessages;
}

const rootReducer = combineReducers<IRootReducer>({
  user: userReducer,
  auth: authReducer,
  chatMessages: chatMessagesReducer,
});

export default rootReducer;
