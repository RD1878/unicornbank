import { IMessages } from "../interfaces/redux";
import { IRootReducer } from "../reducers";

export const chatMessagesSelector = ({
  chatMessages,
}: IRootReducer): IMessages => chatMessages;
