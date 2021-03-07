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

interface IProps {
  $matches: boolean;
}

const StyledList = styled(List)<IProps>`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-right: ${(props) => (props.$matches ? "10px" : "0")};
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
  clientAvatar: string;
  adminAvatar: string;
}

const Dialog: FC<IDialog> = ({ chatMessages, clientAvatar, adminAvatar }) => {
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(scrollToBottom, [chatMessages]);
  return (
    <StyledList $matches={matches}>
      {chatMessages.map((message: IChatMessage) => {
        return (
          <ChatMessage
            key={message.id}
            message={message}
            avatar={message.type === "user" ? clientAvatar : adminAvatar}
          />
        );
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

const StyledPrimaryButton = styled(PrimaryButton)<IProps>`
  & > span > span {
    margin-right: ${(props) => (props.$matches ? "8px" : "0")};
  }
`;

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
      <StyledPrimaryButton
        startIcon={<SendIcon />}
        onClick={handleClick}
        $matches={matches}
      >
        {matches && t("Send")}
      </StyledPrimaryButton>
    </StyledForm>
  );
};

export { StyledList, Dialog, ChatForm };
