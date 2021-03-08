import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";

const StyledAddAvatar = styled("div")`
  position: relative;
  overflow: hidden;
  & > input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0px;
  }
`;

interface IProps {
  addPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AddAvatar: FC<IProps> = ({ addPhoto }) => {
  return (
    <StyledAddAvatar>
      <input onChange={addPhoto} type="file" />
      <AddAPhotoRoundedIcon />
    </StyledAddAvatar>
  );
};

export default AddAvatar;
