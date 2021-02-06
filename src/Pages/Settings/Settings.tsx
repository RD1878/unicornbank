import React, { FC, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField, PrimaryAlert } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/main";
import { passwordValidation } from "../../utils/validationSchemas";
import { ROUTES } from "../../routes";
import { Link } from "react-router-dom";
import PrimaryLink from "../../atoms/PrimaryLink";
import { useAlert } from "../../utils/useAlert";

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
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
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
      onAlertOpen();
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
            <Box mt={5}>
              <PrimaryButton size="large">
                <Link to={ROUTES.OFFICES}>
                  <PrimaryLink component="span">
                    Карта отделений и банкоматов
                  </PrimaryLink>
                </Link>
              </PrimaryButton>
            </Box>
          </StyledBox>
        </StyledColumn>
        <PrimaryAlert
          open={isAlertOpen}
          onClose={onAlertClose}
          alertMessage={alertMessage}
          alertType={alertType}
        />
      </Box>
    </Container>
  );
};

export default Settings;
