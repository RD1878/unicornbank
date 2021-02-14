import { IChatMessage } from "../interfaces/redux";
import { IRootReducer } from "../reducers";

export const chatMessagesSelector = ({
  chatMessages,
}: IRootReducer): IChatMessage[] => chatMessages;
