import { SAVE_CHATMESSAGES } from "../actions";
import { IChatMessage, IActionSaveChatMessage } from "../interfaces/redux";

interface IMessages {
  isLoading: boolean;
  chatMessages: IChatMessage[];
}

const initialState = {
  isLoading: true,
  chatMessages: [],
};

export default (
  state: IMessages = initialState,
  { type, payload }: IActionSaveChatMessage
): IMessages => {
  switch (type) {
    case SAVE_CHATMESSAGES:
      return {
        ...state,
        isLoading: false,
        chatMessages: payload.chatMessages,
      };
    default:
      return state;
  }
};
