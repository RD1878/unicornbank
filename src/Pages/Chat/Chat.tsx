import {
  LinearProgress,
  List,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withTheme,
} from "@material-ui/core";
import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  SyntheticEvent,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ChatMessage, PrimaryButton } from "../../atoms";
import { db, firebaseAuth } from "../../firebase/firebase";
import { randomId } from "../../utils/randomId";
import { IChatMessage } from "../../interfaces/chatMessage";
import { SHACKBAR_SHOW_DURATION } from "../../constants";
import { Alert } from "@material-ui/lab";
import SendIcon from "@material-ui/icons/Send";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../../recoilState/recoilAtoms/authAtom";
import chatMessagesState from "../../recoilState/recoilAtoms/chatMessagesAtom";

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

const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const [chatMessagesData, setChatMessages] = useRecoilState(chatMessagesState);
  const { isLoading, chatMessages, errorMessage } = chatMessagesData;
  const { loading } = useRecoilValue(authState);

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
          },
        ],
      });
    } catch (error) {}
  };
  const useChatMessages = () => {
    useEffect(() => {
      const fetchData = async () => {
        if (!loading) {
          try {
            const uid = firebaseAuth?.currentUser?.uid;
            if (!uid) {
              throw new Error("Некорректный id");
            }
            await db
              .ref("chatMessages/" + uid)
              .limitToLast(10)
              .on("value", (data) => {
                setChatMessages({
                  chatMessages: data.val(),
                  isLoading: false,
                  errorMessage: "",
                });
              });
          } catch (error) {
            setIsOpenAlert(true);
          }
        }
      };
      fetchData();
      return () => {
        fetchData();
      };
    }, [loading]);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  useChatMessages();

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with an employee")}
      </Typography>
      <StyledList>
        {isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          chatMessages.map((message: IChatMessage) => (
            <React.Fragment key={`${randomId()}`}>
              <ChatMessage message={message} />
            </React.Fragment>
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
          {matches && t("Send")}
        </PrimaryButton>
      </StyledForm>
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Chat;
