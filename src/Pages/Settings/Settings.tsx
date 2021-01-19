import React, { FC, useState, ChangeEvent, SyntheticEvent } from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { Alert } from "@material-ui/lab";
import { TAlert } from "../Profile/Profile";
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
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");

  const reauthenticate = () => {
    const user = firebaseAuth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user?.email as string,
      currentPassword
    );

    return user?.reauthenticateWithCredential(cred);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const changePassword = async () => {
    try {
      if (newPassword1 !== newPassword2) {
        throw new Error("Пароли не совпадают");
      }
      await reauthenticate();
      const user = firebaseAuth.currentUser;
      await user?.updatePassword(newPassword2);
      setAlertType("success");
    } catch (error) {
      setError(error.message);
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      setIsOpenAlert(true);
    }
  };

  const changeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const changeNewPassword1 = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword1(e.target.value);
  };

  const changeNewPassword2 = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword2(e.target.value);
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
            onChange={changeCurrentPassword}
          />
          <PasswordField
            name="newPassword1"
            label="Введите новый пароль"
            value={newPassword1}
            error={error}
            onChange={changeNewPassword1}
            helperText={errorMessage}
          />
          <PasswordField
            name="newPassword2"
            label="Повторите новый пароль"
            value={newPassword2}
            error={error}
            onChange={changeNewPassword2}
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
        <Snackbar
          open={isOpenAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alertType} onClose={handleCloseAlert}>
            {alertType === "success" ? "Пароль успешно изменён!" : errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Settings;
