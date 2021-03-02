import { atom, AtomEffect } from "recoil";
import { db } from "../../firebase/firebase";
import { IChats } from "../../interfaces/chats";

interface IChatMessagesState {
  isLoading: boolean;
  chats: IChats;
  errorMessage: string;
}

const chatsAtomEffect: AtomEffect<IChatMessagesState> = ({
  setSelf,
  trigger,
}) => {
  const ref = db.ref(`chatMessages`);
  const fetchMessagesData = async () => {
    try {
      if (trigger === "get") {
        const response = await ref.once("value");
        const data = response.val();
        setSelf({
          chats: data,
          isLoading: false,
          errorMessage: "",
        });
      }
      ref.on("value", (data) => {
        setSelf({
          chats: data.val(),
          isLoading: false,
          errorMessage: "",
        });
      });
    } catch ({ message }) {
      setSelf({
        chats: {},
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

const chatsAtomState = atom<IChatMessagesState>({
  key: "chatsAtomState",
  default: {
    isLoading: true,
    chats: {},
    errorMessage: "",
  },
  effects_UNSTABLE: [chatsAtomEffect],
});

export default chatsAtomState;
