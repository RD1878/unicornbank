import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";

const StyledLogo = styled.div`
  background-image: url(${logo});
  width: 127px;
  height: 56px;
`;

export const Logo: React.FC = () => <StyledLogo />;
