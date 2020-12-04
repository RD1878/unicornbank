import React, { FC } from "react";
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
  background-color: ${darkBlue};
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
  color: #ffffff;
  margin-bottom: 5rem;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

export const Auth: FC = () => {
  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth>
        <div>
          <Title>Вход в личный кабинет</Title>
          <div>
            <MaskedTextField />
          </div>
          <PasswordField />
          <PrimaryButton size="large">Войти</PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};
