import { atom, AtomEffect } from "recoil";
import { fetchChatMessages } from "../../api";
import { firebaseAuth } from "../../firebase/firebase";
import { IChatMessage } from "../../interfaces/chatMessage";

interface IChatMessagesState {
  isLoading: boolean;
  chatMessages: IChatMessage[];
  errorMessage: string;
}

const chatMessagesEffect: AtomEffect<IChatMessagesState> = ({ setSelf }) => {
  const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
    try {
      if (!user) {
        return;
      }

      const chatMessagesData = await fetchChatMessages();

      setSelf({
        isLoading: false,
        chatMessages: chatMessagesData,
        errorMessage: "",
      });
    } catch ({ message }) {
      setSelf({
        isLoading: true,
        chatMessages: [],
        errorMessage: message,
      });
    }
  });
  return () => unsubscribe();
};

const chatMessagesState = atom<IChatMessagesState>({
  key: "chatMessagesState",
  default: {
    isLoading: true,
    chatMessages: [],
    errorMessage: "",
  },
  effects_UNSTABLE: [chatMessagesEffect],
});

export default chatMessagesState;
