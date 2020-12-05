import React, { FC } from "react";
import { Link, Typography } from "@material-ui/core";
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
  min-width: 300px;
  max-width: 800px;
  height: 45vw;
  min-height: 350px;
  max-height: 640px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 1.75em;
  }

  & > div {
    width: 75%;
    max-width: 500px;
    margin-bottom: 2em;
  }
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
        <Typography variant="h1" color="textPrimary" align="center">
          Вход в личный кабинет
        </Typography>
        <MaskedTextField />
        <PasswordField />
        <PrimaryButton size="large">Войти</PrimaryButton>
      </FormAuth>
    </BackGround>
  );
};
