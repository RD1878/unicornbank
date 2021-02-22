import { atom, AtomEffect } from "recoil";
import { fetchChatMessages } from "../../api";
import { firebaseAuth } from "../../firebase/firebase";
import { IChatMessage } from "../../interfaces/chatMessage";

interface IChatMessagesState {
  isLoading: boolean;
  chatMessages: IChatMessage[];
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
      });
    } catch (error) {
      setSelf({
        isLoading: true,
        chatMessages: [],
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
  },
  effects_UNSTABLE: [chatMessagesEffect],
});

export default chatMessagesState;
