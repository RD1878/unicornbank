import { combineReducers } from "redux";
import { IMessages, IUser } from "./../interfaces/redux";
import authReducer, { IAuthSession } from "./authReducer";
import userReducer from "./userReducer";
import chatMessagesReducer from "./chatMessagesReducer";

export interface IRootReducer {
  user: IUser;
  auth: IAuthSession;
  chatMessages: IMessages;
}

const rootReducer = combineReducers<IRootReducer>({
  user: userReducer,
  auth: authReducer,
  chatMessages: chatMessagesReducer,
});

export default rootReducer;
