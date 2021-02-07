import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
  withTheme,
} from "@material-ui/core";
import React, { FC, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
`;

const StyledListItem = withTheme(styled(({ ...props }) => (
  <ListItem {...props} />
))`
  width: fit-content;
  max-width: 50%;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 20px;
  align-self: ${(props) =>
    props.type === "admin" ? "flex-start" : "flex-end"};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${(props) => props.theme.breakpoints.down("sm")} {
    max-width: 100%;
    margin-bottom: 15px;
  }
`);

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

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  align-self: flex-end;
`;

const StyledListItemAvatar = styled(ListItemAvatar)`
  margin-top: 4px;
`;

const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    setMessage("");
  };

  const formatDate = (date: string): string => {
    const obj = new Date(date);
    return obj.toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Chat with an employee")}
      </Typography>
      <StyledList>
        <StyledListItem
          type="user"
          backgroundcolor={theme.palette.secondary.main}
        >
          <StyledListItemAvatar>
            <Avatar alt="User" src="#" />
          </StyledListItemAvatar>
          <StyledWraper>
            <ListItemText>
              <Typography component="span" variant="body1" color="primary">
                {"Добрый день! Сколько дебетовых карт я могу открыть?"}
              </Typography>
            </ListItemText>
            <StyledTypography variant="overline" color="primary">
              {formatDate("2021-01-03T03:42:29Z")}
            </StyledTypography>
          </StyledWraper>
        </StyledListItem>
        <StyledListItem
          type="admin"
          backgroundcolor={theme.palette.primary.dark}
        >
          <StyledListItemAvatar>
            <Avatar alt="Admin" src="#" />
          </StyledListItemAvatar>
          <StyledWraper>
            <ListItemText>
              <Typography component="span" variant="body1" color="textPrimary">
                {
                  "Добрый день! Вы можете открыть любое количество карт в трех любых валютах (Рубли РФ, Доллары США, Евро). Годове обслуживание карт бесплатно."
                }
              </Typography>
            </ListItemText>
            <StyledTypography variant="overline" color="textPrimary">
              {formatDate("2021-01-03T03:44:25Z")}
            </StyledTypography>
          </StyledWraper>
        </StyledListItem>
        <StyledListItem
          type="user"
          backgroundcolor={theme.palette.secondary.main}
        >
          <StyledListItemAvatar>
            <Avatar alt="User" src="#" />
          </StyledListItemAvatar>
          <StyledWraper>
            <ListItemText>
              <Typography component="span" variant="body1" color="primary">
                {"Спасибо за информацию"}
              </Typography>
            </ListItemText>
            <StyledTypography variant="overline" color="primary">
              {formatDate("2021-01-03T03:45:29Z")}
            </StyledTypography>
          </StyledWraper>
        </StyledListItem>
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
