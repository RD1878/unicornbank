import {
  LinearProgress,
  List,
  TextField,
  Typography,
  withTheme,
} from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ChatMessage, PrimaryAlert, PrimaryButton } from "../../atoms";
import { IChatMessage } from "../../interfaces/chatMessage";
import chatMessagesState from "../../recoilState/recoilAtoms/chatMessagesAtom";
import SendIcon from "@material-ui/icons/Send";
import { useAlert } from "../../utils/useAlert";
import { db, firebaseAuth } from "../../firebase/firebase";
import { randomId } from "../../utils/randomId";

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
`;

const StyledForm = withTheme(styled("form")`
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
`);

const StyledTextField = withTheme(styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`);

const ChatBank: FC = () => {
  const [message, setMessage] = useState("");
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorText, setErrorText] = useState("");

  const { t } = useTranslation();
  const { isLoading, chatMessages } = useRecoilValue(
    chatMessagesState("AXWUCpTAxhfHb7nWfoS2Nk7DqZa2")
  );

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
      await db.ref().update({
        [`chatMessages/AXWUCpTAxhfHb7nWfoS2Nk7DqZa2`]: [
          ...chatMessages,
          {
            date: Date.now(),
            type: "admin",
            value: message,
            id: randomId(),
          },
        ],
      });
    } catch (error) {
      setErrorText(error.message);
      onAlertOpen();
    }
  };

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with a client")}
      </Typography>
      <StyledList>
        {isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          chatMessages.map((message: IChatMessage) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </StyledList>
      <StyledForm>
        <StyledTextField
          multiline
          value={message}
          onChange={handleChange}
          autoFocus={true}
          placeholder={t("Enter message")}
        />
        <PrimaryButton startIcon={<SendIcon />} onClick={handleClick}>
          {t("Send")}
        </PrimaryButton>
      </StyledForm>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={errorText}
        alertType="error"
      />
    </>
  );
};

export default ChatBank;
