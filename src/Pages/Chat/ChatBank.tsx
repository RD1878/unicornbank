import { LinearProgress, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IChatMessage } from "../../interfaces/chatMessage";
import chatsAtomState from "../../recoilState/recoilAtoms/chatsAtom";
import { ChatForm, Dialog } from "./ChatComponents";

const StyledTypography = styled(Typography)`
  flex-grow: 0;
`;

interface IProps {
  clientId: string;
  chatMessages: IChatMessage[];
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  isLoading: boolean;
  adminAvatar: string;
}

const ChatBank: FC<IProps> = ({
  isLoading,
  clientId,
  chatMessages,
  message,
  handleChange,
  handleClick,
  adminAvatar,
}) => {
  const { chats } = useRecoilValue(chatsAtomState);
  const clientData = chats[clientId]?.clientData ?? {};
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(clientData).length !== 0 && (
        <StyledTypography variant="h1" color="textPrimary">
          {`${clientData.firstName} ${clientData.patronymic} ${clientData.lastName}`}
        </StyledTypography>
      )}
      {isLoading && <LinearProgress color="secondary" />}
      {!isLoading &&
        (clientId.length ? (
          <>
            <Dialog
              chatMessages={chatMessages}
              clientAvatar={clientData.avatarUrl}
              adminAvatar={adminAvatar}
            />
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
