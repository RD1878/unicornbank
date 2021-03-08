import { Avatar, ListItem, Typography, withTheme } from "@material-ui/core";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import clientIdState from "../recoilState/recoilAtoms/clientIdAtom";
import { formatDate } from "../utils/formatDate";
import { IHeadUserData } from "../interfaces/user";
import { db } from "../firebase/firebase";
import PrimaryAlert from "./PrimaryAlert";
import { useAlert } from "../utils/useAlert";

interface IListItem {
  $isRead: boolean;
}

const StyledListItem = withTheme(styled(ListItem)<IListItem>`
  width: 100%;
  height: 80px;
  background-color: ${(props) => {
    if (props.$isRead) {
      return props.theme.palette.secondary.main;
    } else {
      return props.theme.palette.primary.dark;
    }
  }};
  color: ${(props) => {
    if (props.$isRead) {
      return props.theme.palette.primary.dark;
    } else {
      return props.theme.palette.textPrimary.main;
    }
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  text-transform: none;
`);

const StyledAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

const StyledTypography = styled(Typography)`
  align-self: flex-end;
`;

const StyledTextTypography = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 265px;
`;

interface IProps {
  lastMessage: string;
  clientId: string;
  date: number;
  clientData: IHeadUserData;
  isRead: boolean;
}

const ChatsBankItem: FC<IProps> = ({
  lastMessage,
  clientId,
  date,
  clientData,
  isRead,
}) => {
  const setClientId = useSetRecoilState(clientIdState);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAlertOpen, onAlertClose } = useAlert();

  const { firstName, lastName, patronymic, avatarUrl } = clientData;

  const handleClientId = async () => {
    setClientId({ clientId });
    try {
      await db.ref().update({
        [`chatMessages/${clientId}/isRead`]: true,
      });
    } catch ({ message }) {
      setErrorMessage(message);
    }
  };

  return (
    <StyledListItem onClick={handleClientId} $isRead={isRead}>
      <StyledAvatar sizes="large" alt="name" src={avatarUrl} />
      <Container>
        <StyledTextTypography variant="body2">
          {`${firstName} ${patronymic} ${lastName}`}
        </StyledTextTypography>
        <StyledTextTypography variant="body1">{`${lastMessage}`}</StyledTextTypography>
        <StyledTypography variant="overline">{`${formatDate(
          date
        )}`}</StyledTypography>
      </Container>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={errorMessage}
        alertType={"error"}
      />
    </StyledListItem>
  );
};

export default ChatsBankItem;
