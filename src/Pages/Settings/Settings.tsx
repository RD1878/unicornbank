import React, { FC, useState, SyntheticEvent } from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { Alert } from "@material-ui/lab";
import { TAlert } from "../Profile/Profile";
import { useFormik } from "formik";
import * as yup from "yup";

const StyledColumn = styled("form")`
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

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Введите корректный пароль")
    .required("Введите текущий пароль"),
  newPassword1: yup
    .string()
    .min(8, "Введите новый пароль")
    .required("Введите новый пароль"),
  newPassword2: yup
    .string()
    .min(8, "Введите корректный пароль")
    .required("Повторите новый пароль"),
});

const Settings: FC = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");

  const reauthenticate = (password: string) => {
    const user = firebaseAuth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user?.email as string,
      password
    );

    return user?.reauthenticateWithCredential(cred);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword1: "",
      newPassword2: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { newPassword1, newPassword2, password } = values;
        if (newPassword1 !== newPassword2) {
          throw new Error("Пароли не совпадают");
        }
        await reauthenticate(password);
        const user = firebaseAuth.currentUser;
        await user?.updatePassword(newPassword2);
        setAlertType("success");
      } catch (error) {
        setErrors({
          password: error.message,
          newPassword1: error.message,
          newPassword2: error.message,
        });
        setAlertType("error");
        setErrorMessage(error.message);
      } finally {
        setIsOpenAlert(true);
      }
    },
  });

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Настройки
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          Смена пароля
        </Typography>
        <StyledColumn onSubmit={formik.handleSubmit}>
          <PasswordField
            name="password"
            label="Введите текущий пароль"
            helperText={formik.errors.password}
            value={formik.values.password}
            error={Boolean(formik.errors.password)}
            onChange={formik.handleChange}
          />
          <PasswordField
            name="newPassword1"
            label="Введите новый пароль"
            value={formik.values.newPassword1}
            error={Boolean(formik.errors.newPassword1)}
            onChange={formik.handleChange}
            helperText={formik.errors.newPassword1}
          />
          <PasswordField
            name="newPassword2"
            label="Повторите новый пароль"
            value={formik.values.newPassword2}
            error={Boolean(formik.errors.newPassword2)}
            onChange={formik.handleChange}
            helperText={formik.errors.newPassword2}
          />
          <StyledBox>
            <Typography variant="body2" color="textSecondary">
              Если у вас поменялся логин или вы забыли пароль, обратитесь в
              отделение банка. Для изменения других данных Вы можете обратиться
              в чат.
            </Typography>
            <PrimaryButton size="large" type="submit">
              Сохранить изменения
            </PrimaryButton>
          </StyledBox>
        </StyledColumn>
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
