import {
  LinearProgress,
  List,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withTheme,
} from "@material-ui/core";
import React, { FC, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ChatMessage, PrimaryButton } from "../../atoms";
import { db, firebaseAuth } from "../../firebase/firebase";
import { IChatMessage } from "../../interfaces/chatMessage";
import SendIcon from "@material-ui/icons/Send";
import { useRecoilValue } from "recoil";
import chatMessagesState from "../../recoilState/recoilAtoms/chatMessagesAtom";
import PrimaryAlert from "../../atoms/PrimaryAlert";
import { useAlert } from "../../utils/useAlert";
import { randomId } from "../../utils/randomId";
import authState from "../../recoilState/recoilAtoms/authAtom";

const StyledList = styled(({ ...props }) => <List {...props} />)`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-right: ${(props) => (props.matches ? "10px" : "0")};
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

const StyledPrimaryButton = styled(({ ...props }) => (
  <PrimaryButton {...props} />
))`
  & > span > span {
    margin-right: ${(props) => (props.matches ? "8px" : "0")};
  }
`;

const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorText, setErrorText] = useState("");

  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const user = useRecoilValue(authState);
  const { isLoading, chatMessages } = useRecoilValue(
    chatMessagesState(user?.currentUser?.uid)
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
        [`chatMessages/${uid}`]: [
          ...chatMessages,
          {
            date: Date.now(),
            type: "user",
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
        {t("Chat with an employee")}
      </Typography>
      <StyledList matches={matches}>
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
        <StyledPrimaryButton
          startIcon={<SendIcon />}
          onClick={handleClick}
          matches={matches}
        >
          {matches && t("Send")}
        </StyledPrimaryButton>
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

export default Chat;
