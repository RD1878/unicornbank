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

const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const db = firebase.database();

  useEffect(() => {
    db.ref("/offers") /// получение данных с бд
      .once("value")
      .then((el) => {
        const offer = el.val();
        console.log(offer);
      });
  }, []);

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
  };

  const createAccount = (): void => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password) //войти с помощью почты и пароля
      .then(() => setHasAccount(true))
      .catch(({ message }) => {
        console.error(message);
        setError(true);
        setErrorMessage(message);
      });
  };

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth>
        <div>
          <Typography variant="h1" color="textPrimary" align="center">
            Вход в личный кабинет
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
            error={error}
            name="password"
            value={password}
            onChange={handleChange}
            helperText={errorMessage}
            label="Введите пароль"
          />
          <PrimaryButton onClick={createAccount} size="large">
            Войти
          </PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};

export default Auth;
