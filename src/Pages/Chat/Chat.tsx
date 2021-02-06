import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  withTheme,
} from "@material-ui/core";
import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
`;

const StyledListItem = withTheme(styled(({ ...props }) => (
  <ListItem {...props} />
))`
  width: fit-content;
  max-width: 400px;
  background-color: ${(props) => (props.type === "admin" ? "red" : "green")};
  border-radius: 20px;
  align-self: ${(props) =>
    props.type === "admin" ? "flex-start" : "flex-end"};
`);

const StyledForm = withTheme(styled("form")`
  align-self: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const StyledTextField = withTheme(styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`);

const Chat: FC = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    setMessage("");
  };

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        Чат с поддержкой банка
      </Typography>
      <StyledList>
        <StyledListItem type="admin">
          <ListItemAvatar>
            <Avatar alt="Admin" src="#" />
          </ListItemAvatar>
          <ListItemText>
            <Typography component="span" variant="body2" color="textPrimary">
              {"Добрый день! Чем я могу Вам помочь?"}
            </Typography>
          </ListItemText>
        </StyledListItem>
        <StyledListItem type="user">
          <ListItemAvatar>
            <Avatar alt="User" src="#" />
          </ListItemAvatar>
          <ListItemText>
            <Typography component="span" variant="body2" color="textPrimary">
              {"Хочу заблокировать свою карту"}
            </Typography>
          </ListItemText>
        </StyledListItem>
      </StyledList>
      <StyledForm>
        <StyledTextField
          multiline
          value={message}
          onChange={handleChange}
          autoFocus={true}
          placeholder="Введите сообщение"
        />
        <PrimaryButton onClick={handleClick}>Отправить</PrimaryButton>
      </StyledForm>
    </>
  );
};

export default Chat;
