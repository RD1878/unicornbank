import { SAVE_CHATMESSAGES } from "../actions";
import { IChatMessages, IActionSaveChatMessage } from "../interfaces/redux";

const initialState = {};

export default (
  state: IChatMessages = initialState,
  { type, payload }: IActionSaveChatMessage
): IChatMessages => {
  switch (type) {
    case SAVE_CHATMESSAGES:
      return {
        ...state,
        ...payload.chatMessages,
      };
    default:
      return state;
  }
};
