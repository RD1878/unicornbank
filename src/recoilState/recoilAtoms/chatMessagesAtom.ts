import { AtomEffect, atomFamily } from "recoil";
import { db } from "../../firebase/firebase";
import { IChatMessage } from "../../interfaces/chatMessage";

interface IChatMessagesState {
  isLoading: boolean;
  chatMessages: IChatMessage[];
  errorMessage: string;
}

const chatMessagesEffect: (
  uid: string | undefined
) => AtomEffect<IChatMessagesState> = (uid) => ({ setSelf, trigger }) => {
  const ref = db.ref(`chatMessages/${uid}`);
  const fetchMessagesData = async () => {
    if (trigger === "get") {
      const response = await ref.once("value");
      const data = await response.val();
      setSelf({
        chatMessages: data,
        isLoading: false,
        errorMessage: "",
      });
    }
    try {
      await ref.on("value", (data) => {
        setSelf({
          chatMessages: data.val(),
          isLoading: false,
          errorMessage: "",
        });
      });
    } catch ({ message }) {
      setSelf({
        chatMessages: [],
        isLoading: false,
        errorMessage: message,
      });
    }
  };
  fetchMessagesData();
  return () => {
    ref.off("value");
  };
};

const chatMessagesState = atomFamily<IChatMessagesState, string | undefined>({
  key: "chatMessagesState",
  default: {
    isLoading: true,
    chatMessages: [],
    errorMessage: "",
  },
  effects_UNSTABLE: (uid) => [chatMessagesEffect(uid)],
});

export default chatMessagesState;
