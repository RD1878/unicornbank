import { LinearProgress, Typography } from "@material-ui/core";
import React, { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { IChatMessage } from "../../interfaces/chatMessage";
import { ChatForm, Dialog } from "./ChatComponents";
import { useRecoilValue } from "recoil";
import userState from "../../recoilState/recoilAtoms/userAtom";

interface IChat {
  chatMessages: IChatMessage[];
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  isLoading: boolean;
  adminAvatar: string;
}

const ChatUser: FC<IChat> = ({
  chatMessages,
  message,
  handleChange,
  handleClick,
  isLoading,
  adminAvatar,
}) => {
  const { t } = useTranslation();
  const messages = chatMessages ?? [];
  const { userData } = useRecoilValue(userState);
  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with an employee")}
      </Typography>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        messages.length !== 0 && (
          <Dialog
            chatMessages={messages}
            clientAvatar={userData.avatarUrl}
            adminAvatar={adminAvatar}
          />
        )
      )}
      <ChatForm
        message={message}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </>
  );
};

export default ChatUser;
