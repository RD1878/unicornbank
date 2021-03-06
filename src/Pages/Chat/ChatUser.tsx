import { LinearProgress, Typography } from "@material-ui/core";
import React, { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { IChatMessage } from "../../interfaces/chatMessage";
import { ChatForm, Dialog } from "./ChatComponents";

interface IChat {
  chatMessages: IChatMessage[];
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  isLoading: boolean;
}

const ChatUser: FC<IChat> = ({
  chatMessages,
  message,
  handleChange,
  handleClick,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with an employee")}
      </Typography>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Dialog chatMessages={chatMessages} />
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
