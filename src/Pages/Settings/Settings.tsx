import React, { FC, useState } from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField, PrimaryAlert } from "../../atoms";
import { firebaseAuth } from "../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/tAlert";
import { passwordValidation } from "../../utils/validationSchemas";
import { ELEMENT } from "../../constants";
import { useAlert } from "../../utils/useAlert";
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
  const { t } = useTranslation();
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? t("Password changed successfully!")
      : errorMessage;

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
      <Typography variant="h1" color="textPrimary">
        {t("Settings")}
      </Typography>
      <Typography variant="subtitle1" color="textPrimary">
        {t("A change of the pin code")}
      </Typography>
      <StyledColumn onSubmit={handleSubmit}>
        <PasswordField
          data-test-id={ELEMENT.currentPassword}
          {...getFieldProps("password")}
          label={t("Enter the current password")}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
        />
        <PasswordField
          data-test-id={ELEMENT.newPassword}
          {...getFieldProps("newPassword1")}
          label={t("Enter a new password")}
          error={touched.newPassword1 && Boolean(errors.newPassword1)}
          helperText={touched.newPassword1 && errors.newPassword1}
        />
        <PasswordField
          data-test-id={ELEMENT.repeatNewPassword}
          {...getFieldProps("newPassword2")}
          label={t("Repeat new password")}
          error={touched.newPassword2 && Boolean(errors.newPassword2)}
          helperText={touched.newPassword2 && errors.newPassword2}
        />
        <StyledBox>
          <Typography variant="body2" color="textSecondary">
            {t(
              "If you have forgotten your password, contact the bank branch. To change other data, you can contact the chat"
            )}
          </Typography>
          <StyledPrimaryButton
            size="large"
            type="submit"
            data-test-id={ELEMENT.saveChangesButton}
          >
            {t("Save")}
          </StyledPrimaryButton>
        </StyledBox>
      </StyledColumn>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </>
  );
};

export default Settings;
