import React, { FC } from "react";
import styled from "styled-components";
import { Box, BoxProps } from "@material-ui/core";
import img1 from "../assets/images/offers/offer-1.jpg";
import img2 from "../assets/images/offers/offer-2.jpg";

interface TabPanelProps {
  type: string;
  value: number;
  index: number;
  imagesrc?: number;
}

interface IContainer extends BoxProps {
  imagesrc?: number;
}

const changePhoto = (index: number): string => {
  if (index === 1) {
    return img1;
  }

  return img2;
};

const BackgroundImage = styled("img")`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`;

/* eslint-disable prettier/prettier */
const StyledContainer = styled(Box)<IContainer>`
  position: relative;
  overflow: hidden;
  background: ${(props) =>
    props.imagesrc
      ? "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))"
      : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  & > div {
    position: relative;
  }
`;

const TabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  type,
  imagesrc,
  ...other
}) => (
  <StyledContainer imagesrc={imagesrc}>
    {imagesrc && <BackgroundImage src={changePhoto(imagesrc)} />}
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${type}-tabpanel-${index}`}
      aria-labelledby={`${type}-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  </StyledContainer>
);

export default TabPanel;
