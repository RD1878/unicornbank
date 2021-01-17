import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { db, firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { PrimaryButton, PasswordField, TextField, Logo } from "../../atoms";
import background from "../../assets/images/1-2.png";
import { Snackbar, Link, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ROUTES } from "../../routes";
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
  const history = useHistory();

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

  const createAccount = async (): Promise<void> => {
    try {
      if (verifyPassword !== password) throw new Error("Пароли не совпадают");

      const res = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res?.user?.uid) {
        throw new Error("Ошибка");
      }

      const { uid, email: userEmail } = res.user;

      db.ref("users").child(uid).push().key;
      db.ref().update({
        [`users/${uid}`]: {
          contact: {
            email: userEmail,
          },
          createdAt: new Date(),
          email: email,
        },
      });

      setOpen(true);

      setTimeout(() => {
        history.push(ROUTES.AUTH);
      }, 2000);
    } catch ({ message }) {
      setErrorMessage(message);
      setError(true);
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
          <Link href={ROUTES.AUTH} color="textPrimary">
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
