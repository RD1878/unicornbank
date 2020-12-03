import React from "react";
import styled from "styled-components";
import backGround from "../../assets/images/1-2.png";
import {
  MaskedTextField,
  PrimaryButton,
  PasswordField,
  Logo,
} from "../../atoms";

const darkBlue = "rgba(20, 33, 61, 0.5)";

const BackGround = styled.div`
  background-image: url(${backGround});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.div`
  display: block;
  position: absolute;
  top: 30px;
  left: 3%;
`;

const FormAuth = styled.div`
  min-width: 30vw;
  background-color: ${darkBlue};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 12rem;

  .MuiTextField-root {
    margin-bottom: 3em;
  }

  .MuiButton-root {
    margin-top: 2em;
  }
`;

const Title = styled.div`
  color: #ffffff;
  margin-bottom: 5rem;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

export const Auth: React.FC = () => {
  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth>
        <Title>Вход в личный кабинет</Title>
        <MaskedTextField />
        <PasswordField />
        <PrimaryButton size="large">Войти</PrimaryButton>
      </FormAuth>
    </BackGround>
  );
};
