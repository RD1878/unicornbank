import React, { FC, useState, SyntheticEvent } from "react";
import { Typography, Snackbar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/tAlert";
import { passwordValidation } from "../../utils/validationSchemas";
import { SHACKBAR_SHOW_DURATION } from "../../constants";
import { useTranslation } from "react-i18next";

const StyledColumn = styled("form")`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
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
  margin-top: 20px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: fit-content;
  align-self: center;
`;

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
  const { t } = useTranslation();

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
      validationSchema: yup.object({
        password: passwordValidation(
          t("Enter the current password"),
          t("Enter the current password")
        ),
        newPassword1: passwordValidation(
          t("Password must contain at least 8 characters"),
          t("Create your password")
        ),
        newPassword2: passwordValidation(
          t("Password must contain at least 8 characters"),
          t("Repeat your password")
        ),
      }),
      onSubmit,
    }
  );

  return (
    <>
      <Box mt={2}>
        <Typography variant="h1" color="textPrimary">
          {t("Settings")}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {t("A change of the pin code")}
        </Typography>
        <StyledColumn onSubmit={handleSubmit}>
          <PasswordField
            {...getFieldProps("password")}
            label={t("Enter the current password")}
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
          />
          <PasswordField
            {...getFieldProps("newPassword1")}
            label={t("Enter a new password")}
            error={touched.newPassword1 && Boolean(errors.newPassword1)}
            helperText={touched.newPassword1 && errors.newPassword1}
          />
          <PasswordField
            {...getFieldProps("newPassword2")}
            label={t("Repeat new password")}
            error={touched.newPassword2 && Boolean(errors.newPassword2)}
            helperText={touched.newPassword2 && errors.newPassword2}
          />
          <StyledBox>
            <Typography variant="body2" color="textSecondary">
              {t(
                "If your username has changed or you forgot your password, contact the bank branch. To change other data, you can contact the chat."
              )}
            </Typography>
            <StyledPrimaryButton size="large" type="submit">
              {t("Save changes")}
            </StyledPrimaryButton>
            <Box mt={5}></Box>
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
    </>
  );
};

export default Settings;
