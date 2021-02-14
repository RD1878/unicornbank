import { SAVE_CHATMESSAGES } from "../actions";
import { IChatMessage, IActionSaveChatMessage } from "../interfaces/redux";

const initialState: [] = [];

export default (
  state: IChatMessage[] = initialState,
  { type, payload }: IActionSaveChatMessage
): IChatMessage[] => {
  switch (type) {
    case SAVE_CHATMESSAGES:
      return payload.chatMessages;
    default:
      return state;
  }
};
