import React, { FC } from "react";
import { Link } from "@material-ui/core";
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${darkBlue};
  border-radius: 20px;
  width: 55vw;
  max-width: 800px;
  height: 45vw;
  max-height: 640px;

  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & > div {
      width: 35vw;
      max-width: 500px;
      margin-bottom: 2em;
    }
  }
`;

const Title = styled.div`
  color: #ffffff;
  margin-bottom: 3rem;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

export const Auth: FC = () => {
  return (
    <BackGround>
      <StyledLogo>
        <Logo />
        <Link href="/main" color="textPrimary">
          Главная
        </Link>
      </StyledLogo>
      <FormAuth>
        <div>
          <Title>Вход в личный кабинет</Title>
          <MaskedTextField />
          <PasswordField />
          <PrimaryButton size="large">Войти</PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};
