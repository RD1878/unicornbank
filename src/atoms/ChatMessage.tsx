import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withTheme,
} from "@material-ui/core";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import userState from "../recoilState/recoilAtoms/userAtom";
import { formatDate } from "../utils/formatDate";

interface IProps {
  $isAdmin: boolean;
  type: string;
}

const StyledListItem = withTheme(styled(ListItem)<IProps>`
  width: fit-content;
  max-width: 50%;
  background-color: ${(props) => {
    if (props.$isAdmin) {
      return props.type === "admin"
        ? props.theme.palette.secondary.main
        : props.theme.palette.primary.dark;
    } else {
      return props.type === "admin"
        ? props.theme.palette.primary.dark
        : props.theme.palette.secondary.main;
    }
  }};
  border-radius: 20px;
  align-self: ${(props) => {
    if (props.$isAdmin) {
      return props.type === "admin" ? "flex-end" : "flex-start";
    } else {
      return props.type === "admin" ? "flex-start" : "flex-end";
    }
  }};
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

const StyledTypography = withTheme(styled(Typography)<IProps>`
  align-self: flex-end;
  overflow-wrap: anywhere;
  color: ${(props) => {
    if (props.$isAdmin) {
      return props.type === "admin"
        ? props.theme.palette.primary.dark
        : props.theme.palette.textPrimary.main;
    } else {
      return props.type === "admin"
        ? props.theme.palette.textPrimary.main
        : props.theme.palette.primary.dark;
    }
  }};
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
  const { userData } = useRecoilValue(userState);
  const { isAdmin } = userData;

  return (
    <StyledListItem type={type} $isAdmin={isAdmin}>
      <StyledListItemAvatar>
        <Avatar alt={type} src="#" />
      </StyledListItemAvatar>
      <StyledWraper>
        <ListItemText>
          <StyledTypography
            type={type}
            $isAdmin={isAdmin}
            component="span"
            variant="body1"
          >
            {value}
          </StyledTypography>
        </ListItemText>
        <StyledTypography type={type} $isAdmin={isAdmin} variant="overline">
          {formatDate(date)}
        </StyledTypography>
      </StyledWraper>
    </StyledListItem>
  );
};

export default ChatMessage;
