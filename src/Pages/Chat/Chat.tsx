import { List, TextField, Typography, withTheme } from "@material-ui/core";
import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ChatMessage, PrimaryButton } from "../../atoms";
import { useSelector, useDispatch } from "react-redux";
import { chatMessagesSelector } from "../../selectors";
import {
  db,
  firebaseAuth,
  readChatMessagesData,
} from "../../firebase/firebase";
import { saveChatMessages } from "../../actions/chatMessages";
import { randomId } from "../../utils/randomId";
import { IChatMessage } from "../../interfaces/redux";

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
`;

const StyledForm = withTheme(styled("form")`
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`);

const StyledTextField = withTheme(styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`);

const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const messages = useSelector(chatMessagesSelector);
  /*   const [errorMessage, setErrorMessage] = useState("");
   */ const dispatch = useDispatch();
  const { t } = useTranslation();

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
          ...messages,
          {
            date: Date.now(),
            type: "user",
            value: message,
          },
        ],
      });
      readChatMessagesData(uid, (data) => {
        dispatch(saveChatMessages(data.val()));
      });
      /* const updatedChatMessages = await readChatMessagesData(uid); */
      /* dispatch(saveChatMessages(updatedChatMessages)); */
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await firebaseAuth?.currentUser?.uid;
        if (!uid) {
          throw new Error("Некорректный id");
        }
        /* const data = await readChatMessagesData(uid); */
        readChatMessagesData(uid, (data) => {
          dispatch(saveChatMessages(data.val()));
        });
        /* dispatch(saveChatMessages(data)); */
      } catch (error) {
        /* console.log(error); */
      }
    };
    fetchData();
  }, []);

  /* const arrayMessages = Object.entries(messages); */
  /* console.log(messages); */
  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with an employee")}
      </Typography>
      <StyledList>
        {messages.map((message: IChatMessage) => (
          <React.Fragment key={`${randomId()}`}>
            <ChatMessage message={message} />
          </React.Fragment>
        ))}
      </StyledList>
      <StyledForm>
        <StyledTextField
          multiline
          value={message}
          onChange={handleChange}
          autoFocus={true}
          placeholder={t("Enter message")}
        />
        <PrimaryButton onClick={handleClick}>{t("Send")}</PrimaryButton>
      </StyledForm>
    </>
  );
};

export default Chat;
