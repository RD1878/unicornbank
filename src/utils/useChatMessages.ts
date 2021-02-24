import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchChatMessages } from "../api";
import { firebaseAuth } from "../firebase/firebase";
import authState from "../recoilState/recoilAtoms/authAtom";
import chatMessagesState from "../recoilState/recoilAtoms/chatMessagesAtom";
import { useAlert } from "./useAlert";

const useChatMessages = (): void => {
  const { loading } = useRecoilValue(authState);
  const [, setErrorText] = useState("");
  const { onAlertOpen } = useAlert();

  const setChatMessages = useSetRecoilState(chatMessagesState);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        try {
          const uid = firebaseAuth?.currentUser?.uid;
          if (!uid) {
            throw new Error("Некорректный id");
          }

          const chatMessagesData = await fetchChatMessages();

          {
            setChatMessages({
              chatMessages: chatMessagesData,
              isLoading: false,
              errorMessage: "",
            });
          }
        } catch (error) {
          setErrorText(error.message);
          onAlertOpen();
        }
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [loading]);
};

export default useChatMessages;
