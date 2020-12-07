import React, { FC } from "react";
import styled from "styled-components";
import backGround from "../../assets/images/1-2.png";
import logo from "../../assets/images/logo.png";
import PasswordField from "../../atoms/PasswordField";
import PrimaryButton from "../../atoms/PrimaryButton";
import TextField from "../../atoms/TextField";
import { COLORS } from "../../theme";

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

const Logo = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  width: 130px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 3%;
`;

const FormAuth = styled.div`
  background-color: ${COLORS.DARK_BLUE_05};
  border-radius: 2rem;
  display: flex;
  min-width: 35vw;
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    justify-content: center;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      margin-bottom: 3em;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  color: ${COLORS.WHITE};
  margin-bottom: 5rem;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

const Auth: FC = () => {
  return (
    <BackGround>
      <Logo></Logo>
      <FormAuth>
        <div>
          <Title>Вход в личный кабинет</Title>
          <div>
            <TextField label="Почта" />
          </div>
          <PasswordField />
          <PrimaryButton>Войти</PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};

export default Auth;
