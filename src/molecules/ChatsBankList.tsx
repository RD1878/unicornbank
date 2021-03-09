import { List } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

const StyledList = styled(List)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatsBankList: FC = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default ChatsBankList;
