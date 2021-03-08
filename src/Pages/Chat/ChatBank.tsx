import { LinearProgress, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { IChatMessage } from "../../interfaces/chatMessage";
import chatsAtomState from "../../recoilState/recoilAtoms/chatsAtom";
import { ChatForm, Dialog } from "./ChatComponents";

interface IProps {
  clientId: string;
  chatMessages: IChatMessage[];
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  isLoading: boolean;
}

const ChatBank: FC<IProps> = ({
  isLoading,
  clientId,
  chatMessages,
  message,
  handleChange,
  handleClick,
}) => {
  const { chats } = useRecoilValue(chatsAtomState);
  const clientData = chats[clientId]?.clientData ?? {};
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(clientData).length !== 0 && (
        <Typography variant="h1" color="textPrimary">
          {`${t("Chat with a client")} ${clientData.lastName} ${
            clientData.firstName
          } ${clientData.patronymic}`}
        </Typography>
      )}
      {isLoading && <LinearProgress color="secondary" />}
      {!isLoading &&
        (clientId.length ? (
          <>
            <Dialog chatMessages={chatMessages} />
            <ChatForm
              message={message}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </>
        ) : (
          <Typography variant="h1" color="textPrimary">
            {t("Выберите чат с клиентом")}
          </Typography>
        ))}
    </>
  );
};

export default ChatBank;