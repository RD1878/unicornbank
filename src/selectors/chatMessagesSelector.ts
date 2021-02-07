import { IChatMessages } from "../interfaces/redux";
import { IRootReducer } from "../reducers";

export const chatMessagesSelector = ({
  chatMessages,
}: IRootReducer): IChatMessages => chatMessages;
