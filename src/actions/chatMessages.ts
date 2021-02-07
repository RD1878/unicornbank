import { SAVE_CHATMESSAGES, REQUEST_CHATMESSAGES } from "./constants";
import { IActionSaveChatMessage, IChatMessages } from "../interfaces/redux";

export const requestChatMessages = (): { type: string } => ({
  type: REQUEST_CHATMESSAGES,
});

export const saveChatMessages = (
  chatMessages: IChatMessages
): IActionSaveChatMessage => ({
  type: SAVE_CHATMESSAGES,
  payload: {
    chatMessages,
  },
});
