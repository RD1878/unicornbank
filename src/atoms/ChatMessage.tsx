import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  withTheme,
} from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

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

const StyledListItemAvatar = styled(ListItemAvatar)`
  margin-top: 4px;
`;

const StyledWraper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  align-self: flex-end;
`;

const ChatMessage: FC = () => {
  const theme = useTheme();

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
    <StyledListItem type="admin" backgroundcolor={theme.palette.primary.dark}>
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
  );
};

export default ChatMessage;
