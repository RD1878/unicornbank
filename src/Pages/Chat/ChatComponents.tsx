import {
  List,
  TextField,
  useMediaQuery,
  useTheme,
  withTheme,
} from "@material-ui/core";
import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ChatMessage, PrimaryButton } from "../../atoms";
import { IChatMessage } from "../../interfaces/chatMessage";
import SendIcon from "@material-ui/icons/Send";

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

interface IDialog {
  chatMessages: IChatMessage[];
}

const Dialog: FC<IDialog> = ({ chatMessages }) => {
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [chatMessages]);
  return (
    <StyledList>
      {chatMessages.map((message: IChatMessage) => {
        return <ChatMessage key={message.id} message={message} />;
      })}
      <div ref={messagesEndRef} />
    </StyledList>
  );
};

interface IChatForm {
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

const ChatForm: FC<IChatForm> = ({ message, handleChange, handleClick }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
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
  );
};

export { StyledList, Dialog, ChatForm };
