import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import background from "../../assets/images/1-2.png";
import { TextField, PrimaryButton, PasswordField, Logo } from "../../atoms";
import { device } from "./../../theme/device";
import { useHistory } from "react-router-dom";

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

    @media ${device.mobileM} {
      margin-bottom: 1em;
    }
  }
  & > div {
    width: 75%;
    max-width: 500px;
    margin-bottom: 2em;
  }
`);

const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

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

  const userAuthorization = (): void => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password) //войти с помощью почты и пароля
      .then(() => {
        history.push("/");
      })
      .catch((error: Error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth>
        <Typography variant="h1" color="textPrimary" align="center">
          Вход в личный кабинет
        </Typography>
        <TextField
          fullWidth
          error={error}
          label="Почта"
          name="email"
          value={email}
          onChange={handleChange}
          helperText={errorMessage}
        />
        <PasswordField
          error={error}
          name="password"
          value={password}
          onChange={handleChange}
          helperText={errorMessage}
          label="Введите пароль"
        />
        <PrimaryButton onClick={userAuthorization} size="large">
          Войти
        </PrimaryButton>
      </FormAuth>
    </BackGround>
  );
};

export default Auth;
