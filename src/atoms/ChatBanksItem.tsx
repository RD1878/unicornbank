import { ListItem, withTheme } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import clientIdState from "../recoilState/recoilAtoms/clientIdAtom";
import { formatDate } from "../utils/formatDate";
import { IHeadUserData } from "../interfaces/user";

const StyledListItem = withTheme(styled(({ ...props }) => (
  <ListItem {...props} />
))`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.primary.dark};
  border-radius: 10px;
  /* align-self: ${(props) => {
    if (props.isAdmin) {
      return props.type === "admin" ? "flex-end" : "flex-start";
    } else {
      return props.type === "admin" ? "flex-start" : "flex-end";
    }
  }}; */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  text-transform: none;
`);

interface IProps {
  lastMessage: string;
  clientId: string;
  date: number;
  clientData: IHeadUserData;
}

const ChatsBankItem: FC<IProps> = ({
  lastMessage,
  clientId,
  date,
  clientData,
}) => {
  const setClientId = useSetRecoilState(clientIdState);
  const { firstName, lastName, patronymic /* avatarUrl */ } = clientData;

  const handleClientId = () => {
    setClientId({ clientId });
  };

  return (
    <StyledListItem onClick={handleClientId}>{`${lastMessage} ${formatDate(
      date
    )} ${firstName} ${lastName} ${patronymic}`}</StyledListItem>
  );
};

export default ChatsBankItem;
