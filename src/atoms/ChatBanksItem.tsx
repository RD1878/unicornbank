import { ListItem, withTheme } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import clientIdState from "../recoilState/recoilAtoms/clientIdAtom";

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
`);

interface IProps {
  lastMessage: string;
  clientId: string;
}

const ChatsBankItem: FC<IProps> = ({ lastMessage, clientId }) => {
  const setClientId = useSetRecoilState(clientIdState);

  const handleClientId = () => {
    setClientId({ clientId });
  };

  return (
    <StyledListItem onClick={handleClientId}>{lastMessage}</StyledListItem>
  );
};

export default ChatsBankItem;
