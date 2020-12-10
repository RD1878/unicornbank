import React, { FC, useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import backGround from "../../assets/images/1-2.png";
import logo from "../../assets/images/logo.png";
import PasswordField from "../../atoms/PasswordField";
import PrimaryButton from "../../atoms/PrimaryButton";
import TextField from "../../atoms/TextField";
import { COLORS } from "../../theme";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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
      margin-bottom: 2em;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  color: ${COLORS.WHITE};
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setError(false);
    setErrorMessage("");

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "verifyPassword") {
      setVerifyPassword(value);
    }
  };

  const createAccount = (): void => {
    if (verifyPassword === password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password) //создание аккаунта
        .catch(({ message }) => {
          console.error(message);
          setError(true);
          setErrorMessage(message);
        });
    } else {
      setError(true);
      setErrorMessage("Пароли не совпадают");
    }
  };

  return (
    <BackGround>
      <Logo></Logo>
      <FormAuth>
        <div>
          <Title>Регистрация</Title>
          <div>
            <TextField
              error={error}
              label="Почта"
              name="email"
              value={email}
              onChange={handleChange}
              helperText={errorMessage}
            />
          </div>
          <PasswordField
            error={error}
            name="password"
            value={password}
            onChange={handleChange}
            helperText={errorMessage}
            label="Введите пароль"
          />
          <PasswordField
            error={error}
            name="verifyPassword"
            value={verifyPassword}
            onChange={handleChange}
            helperText={errorMessage}
            label="Повторите пароль"
          />
          <PrimaryButton onClick={createAccount}>
            Зарегистрироваться
          </PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};

export default Register;
