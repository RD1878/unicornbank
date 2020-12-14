import React, { FC, useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { PrimaryButton, PasswordField, TextField, Logo } from "../../atoms";
import background from "../../assets/images/1-2.png";

const BackGround = styled.div`
  background-image: url(${background});
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

const FormAuth = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `${props.theme.palette.primary.main}50`};
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
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      margin-bottom: 2em;
    }
  }
`);

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
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth>
        <div>
          <Typography variant="h1" color="textPrimary" align="center">
            Регистрация
          </Typography>
          <div>
            <TextField
              fullWidth
              error={error}
              label="Почта"
              name="email"
              value={email}
              onChange={handleChange}
              helperText={errorMessage}
            />
          </div>
          <PasswordField
            fullWidth
            error={error}
            name="password"
            value={password}
            onChange={handleChange}
            helperText={errorMessage}
            label="Введите пароль"
          />
          <PasswordField
            fullWidth
            error={error}
            name="verifyPassword"
            value={verifyPassword}
            onChange={handleChange}
            helperText={errorMessage}
            label="Повторите пароль"
          />
          <PrimaryButton onClick={createAccount} size="large">
            Зарегистрироваться
          </PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};

export default Register;
