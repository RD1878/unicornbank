import React, { FC } from "react";
import styled from "styled-components";
import { Box, BoxProps } from "@material-ui/core";
import img1 from "../assets/images/offers/offer-1.jpg";
import img2 from "../assets/images/offers/offer-2.jpg";
import img3 from "../assets/images/offers/offer-3.jpg";

interface TabPanelProps {
  type: string;
  value: number;
  index: number;
  imagesrc?: string;
}

interface IContainer extends BoxProps {
  imagesrc?: string;
}

const StyledContainer = styled(Box)`
  background-image: url(${(props: IContainer) => props.imagesrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
