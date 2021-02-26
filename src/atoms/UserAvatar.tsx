import { Avatar } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`;

interface IProps {
  avatarUrl: string;
  onToggleMobileDrawer?: () => void;
}

const UserAvatar: FC<IProps> = ({ avatarUrl, onToggleMobileDrawer }) => {
  return (
    <StyledAvatar
      sizes="large"
      alt="name"
      src={avatarUrl}
      onClick={onToggleMobileDrawer}
    />
  );
};

export default UserAvatar;
