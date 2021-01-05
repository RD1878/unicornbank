import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { PrimaryButton, PasswordField, TextField, Logo } from "../../atoms";
import background from "../../assets/images/1-2.png";
import { Snackbar, Link, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ROUTES } from "../../routes";

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

    & > a {
      & > p {
        margin-top: 30px;
      }
    }
  }
`);

const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setError(false);
    setErrorMessage("");

    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return setVerifyPassword(value);
    }
  };

  const createAccount = (): void => {
    if (verifyPassword === password) {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password) //создание аккаунта
        .then(() => {
          setOpen(true);
          setTimeout(() => {
            location.href = "/";
          }, 2000);
        })
        .catch((error: Error) => {
          setError(true);
          setErrorMessage(error.message);
        });
    } else {
      setError(true);
      setErrorMessage("Пароли не совпадают");
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          <Link href={ROUTES.auth} color="textPrimary">
            <Typography variant="body2" color="textPrimary" align="center">
              У вас уже есть аккаунт?
            </Typography>
          </Link>
        </div>
      </FormAuth>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Вы успешно зарегистрированы!
        </Alert>
      </Snackbar>
    </BackGround>
  );
};

export default Register;
