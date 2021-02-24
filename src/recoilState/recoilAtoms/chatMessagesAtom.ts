import { atom, AtomEffect } from "recoil";
import { db, firebaseAuth } from "../../firebase/firebase";
import { IChatMessage } from "../../interfaces/chatMessage";

interface IChatMessagesState {
  isLoading: boolean;
  chatMessages: IChatMessage[];
  errorMessage: string;
}

const chatMessagesEffect: AtomEffect<IChatMessagesState> = ({ setSelf }) => {
  const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
    const fetchMessagesData = async () => {
      try {
        if (!user) {
          setSelf({
            isLoading: false,
            chatMessages: [],
            errorMessage: "Нет активной сессии",
          });
        } else {
          const { uid } = user;
          await db
            .ref("chatMessages/" + uid)
            .limitToLast(10)
            .on("value", (data) => {
              setSelf({
                chatMessages: data.val(),
                isLoading: false,
                errorMessage: "",
              });
            });
        }
      } catch ({ message }) {
        setSelf({
          chatMessages: [],
          isLoading: false,
          errorMessage: message,
        });
      }
    };
    fetchMessagesData();
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
