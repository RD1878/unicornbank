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
  imagesrc?: number;
}

interface IContainer extends BoxProps {
  imagesrc?: number;
}

const StyledContainer = styled(Box)`
  background-image: ${(props) =>
      props.imagesrc
        ? "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))"
        : "none"},
    url(${(props: IContainer) => {
      switch (props.imagesrc) {
        case 1:
          return img1;
          break;
        case 2:
          return img2;
        case 3:
          return img3;
        default:
          break;
      }
    }});
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
