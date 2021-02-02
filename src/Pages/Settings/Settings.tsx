import React, { FC, useState, SyntheticEvent } from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/main";
import { passwordValidation } from "../../utils/validationSchemas";
import { SHACKBAR_SHOW_DURATION } from "../../constants";

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
  password: passwordValidation("Введите текущий пароль"),
  newPassword1: passwordValidation("Введите новый пароль"),
  newPassword2: passwordValidation("Повторите новый пароль"),
});

interface IFormValues {
  password: string;
  newPassword1: string;
  newPassword2: string;
}

const Settings: FC = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Пароль успешно изменён!" : errorMessage;

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

  const onSubmit = async (formData: IFormValues) => {
    try {
      const { newPassword1, newPassword2, password } = formData;
      if (newPassword1 !== newPassword2) {
        throw new Error("Пароли не совпадают");
      }
      await reauthenticate(password);
      const user = firebaseAuth.currentUser;
      await user?.updatePassword(newPassword2);
      setAlertType("success");
      resetForm();
    } catch (error) {
      setAlertType("error");
      setErrorMessage(error.message);
    } finally {
      setIsOpenAlert(true);
    }
  };

  const { errors, handleSubmit, touched, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        password: "",
        newPassword1: "",
        newPassword2: "",
      },
      validationSchema,
      onSubmit,
    }
  );

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Настройки
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          Смена пароля
        </Typography>
        <StyledColumn onSubmit={handleSubmit}>
          <PasswordField
            {...getFieldProps("password")}
            label="Введите текущий пароль"
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
          />
          <PasswordField
            {...getFieldProps("newPassword1")}
            label="Введите новый пароль"
            error={touched.newPassword1 && Boolean(errors.newPassword1)}
            helperText={touched.newPassword1 && errors.newPassword1}
          />
          <PasswordField
            {...getFieldProps("newPassword2")}
            label="Повторите новый пароль"
            error={touched.newPassword2 && Boolean(errors.newPassword2)}
            helperText={touched.newPassword2 && errors.newPassword2}
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
          autoHideDuration={SHACKBAR_SHOW_DURATION}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={alertType} onClose={handleCloseAlert}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Settings;
