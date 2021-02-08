import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withTheme,
} from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

const StyledListItem = withTheme(styled(({ ...props }) => (
  <ListItem {...props} />
))`
  width: fit-content;
  max-width: 50%;
  background-color: ${(props) =>
    props.type === "admin"
      ? props.theme.palette.primary.dark
      : props.theme.palette.secondary.main};
  border-radius: 20px;
  align-self: ${(props) =>
    props.type === "admin" ? "flex-start" : "flex-end"};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
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

const StyledTypography = withTheme(styled(({ ...props }) => (
  <Typography {...props} />
))`
  align-self: flex-end;
  color: ${(props) =>
    props.type === "admin"
      ? props.theme.palette.textPrimary.main
      : props.theme.palette.primary.dark};
`);

interface IMessage {
  message: {
    date: number;
    type: string;
    value: string;
  };
}

const ChatMessage: FC<IMessage> = ({ message }) => {
  const { date, type, value } = message;
  const formatDate = (date: number): string => {
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
    <StyledListItem type={type}>
      <StyledListItemAvatar>
        <Avatar alt={type} src="#" />
      </StyledListItemAvatar>
      <StyledWraper>
        <ListItemText>
          <StyledTypography type={type} component="span" variant="body1">
            {value}
          </StyledTypography>
        </ListItemText>
        <StyledTypography type={type} variant="overline">
          {formatDate(date)}
        </StyledTypography>
      </StyledWraper>
    </StyledListItem>
  );
};

export default ChatMessage;
