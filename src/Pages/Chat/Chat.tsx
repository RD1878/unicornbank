import React, { FC, useState, ChangeEvent } from "react";
import { db, firebaseAuth } from "../../firebase/firebase";
import { useRecoilValue } from "recoil";
import chatMessagesState from "../../recoilState/recoilAtoms/chatMessagesAtom";
import PrimaryAlert from "../../atoms/PrimaryAlert";
import { useAlert } from "../../utils/useAlert";
import { randomId } from "../../utils/randomId";
import authState from "../../recoilState/recoilAtoms/authAtom";
import userState from "../../recoilState/recoilAtoms/userAtom";
import ChatBank from "./ChatBank";
import ChatUser from "./ChatUser";

interface IProps {
  clientId: string;
}

const Chat: FC<IProps> = ({ clientId }) => {
  const [message, setMessage] = useState("");
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorText, setErrorText] = useState("");
  const { userData } = useRecoilValue(userState);
  const { isAdmin } = userData;
  const user = useRecoilValue(authState);

  const currentUserData = useRecoilValue(
    chatMessagesState(user?.currentUser?.uid)
  );
  const isLoadingCurrentUser = currentUserData.isLoading;
  const chatMessagesCurrentUser = currentUserData.chatMessages ?? [];

  const clientIdData = useRecoilValue(chatMessagesState(clientId));
  const isLoadingClient = clientIdData.isLoading;
  const chatMessagesClient = clientIdData.chatMessages;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = async () => {
    setMessage("");
    try {
      const uid = firebaseAuth?.currentUser?.uid;

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      if (isAdmin) {
        await db.ref().update({
          [`chatMessages/${clientId}/dialog`]: [
            ...chatMessagesClient,
            {
              date: Date.now(),
              type: "admin",
              value: message,
              id: randomId(),
            },
          ],
        });
      }
      if (!isAdmin) {
        await db.ref().update({
          [`chatMessages/${uid}/dialog`]: [
            ...chatMessagesCurrentUser,
            {
              date: Date.now(),
              type: "user",
              value: message,
              id: randomId(),
            },
          ],
          [`chatMessages/${uid}/isRead`]: false,
        });
      }
    } catch (error) {
      setErrorText(error.message);
      onAlertOpen();
    }
  };

  return (
    <>
      {isAdmin ? (
        <ChatBank
          isLoading={isLoadingClient}
          clientId={clientId}
          chatMessages={chatMessagesClient}
          message={message}
          handleChange={handleChange}
          handleClick={handleClick}
        />
      ) : (
        <ChatUser
          isLoading={isLoadingCurrentUser}
          chatMessages={chatMessagesCurrentUser}
          handleChange={handleChange}
          handleClick={handleClick}
          message={message}
        />
      )}
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={errorText}
        alertType="error"
      />
    </>
  );
};

export default Chat;
