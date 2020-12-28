import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { IAtm } from "./../Pages/Map/Map";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

interface IMapInfo extends IAtm {
  onClose: () => void;
}

const StyledItem = withTheme(styled("div")`
  width: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  padding: 28px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`);

const StyledWrap = withTheme(styled("div")`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`);

const MapInfoItem: FC<IMapInfo> = ({
  name,
  address,
  timeStart,
  timeEnd,
  onClose,
}) => {
  return (
    <StyledItem>
      <Typography variant="h2" color="initial">
        {address}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        {name}
      </Typography>
      <Typography variant="subtitle2" color="initial">
        пн-чт {timeStart} - {timeEnd}
      </Typography>
      <StyledWrap>
        <CloseRoundedIcon onClick={onClose} color="secondary">
          Close
        </CloseRoundedIcon>
      </StyledWrap>
    </StyledItem>
  );
};

export default MapInfoItem;
