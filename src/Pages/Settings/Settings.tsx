import React, { FC, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";

const StyledColumn = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  max-width: 496px;

  & > div {
    margin-bottom: 20px;
    width: 100%;

    & > p {
      margin-bottom: 20px;
    }
  }

  p {
    margin-bottom: 60px;
  }
`;

const StyledBox = styled(Box)`
  p {
    margin-bottom: 60px;
  }
  max-width: 496px;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Settings: FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const reauthenticate = async () => {
    const user = firebaseAuth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user?.email as string,
      currentPassword
    );

    return user?.reauthenticateWithCredential(cred);
  };

  const changePassword = async () => {
    try {
      if (newPassword1 !== newPassword2) {
        throw new Error("Пароли не совпадают");
      }
      await reauthenticate();
      const user = firebaseAuth.currentUser;
      await user?.updatePassword(newPassword2);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Настройки
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          Смена пароля
        </Typography>
        <StyledColumn>
          <PasswordField
            name="password"
            label="Введите текущий пароль"
            helperText={errorMessage}
            value={currentPassword}
            error={error}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <PasswordField
            name="newPassword1"
            label="Введите новый пароль"
            value={newPassword1}
            error={error}
            onChange={(event) => setNewPassword1(event.target.value)}
            helperText={errorMessage}
          />
          <PasswordField
            name="newPassword2"
            label="Повторите новый пароль"
            value={newPassword2}
            error={error}
            onChange={(event) => setNewPassword2(event.target.value)}
            helperText={errorMessage}
          />
        </StyledColumn>
        <StyledBox>
          <Typography variant="body2" color="textSecondary">
            Если у вас поменялся логин или вы забыли пароль, обратитесь в
            отделение банка. Для изменения других данных Вы можете обратиться в
            чат.
          </Typography>
          <PrimaryButton size="large" onClick={changePassword}>
            Сохранить изменения
          </PrimaryButton>
        </StyledBox>
      </Box>
    </Container>
  );
};

export default Settings;
