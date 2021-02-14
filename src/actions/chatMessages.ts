import { SAVE_CHATMESSAGES, REQUEST_CHATMESSAGES } from "./constants";
import { IActionSaveChatMessage, IChatMessage } from "../interfaces/redux";

export const requestChatMessages = (): { type: string } => ({
  type: REQUEST_CHATMESSAGES,
});

export const saveChatMessages = (
  chatMessages: IChatMessage[]
): IActionSaveChatMessage => ({
  type: SAVE_CHATMESSAGES,
  payload: {
    chatMessages,
  },
});
