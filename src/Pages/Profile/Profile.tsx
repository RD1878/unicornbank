import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { Typography } from "@material-ui/core";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { PrimaryAlert, PrimaryButton, TextField } from "../../atoms";
import { db, firebaseAuth } from "../../firebase/firebase";
import { useFormik } from "formik";
import * as yup from "yup";
import { withTheme } from "@material-ui/core/styles";
import { TAlert } from "../../interfaces/tAlert";
import { REQUIRED_MESSAGE } from "../../constants";
import {
  emailValidation,
  phoneValidation,
} from "./../../utils/validationSchemas";
import { useAlert } from "../../utils/useAlert";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import userState from "../../recoilState/recoilAtoms/userAtom";
import { fetchUser } from "../../api";

export const PATTERN = /^\D*([0-9])(\d{0,3})\D*(\d{0,3})\D*(\d{0,2})\D*(\d{0,2})/;
export const NOT_NUMBER_REGEX = /\D/g;

const cleanPhone = (phone: string): string =>
  phone.replace(NOT_NUMBER_REGEX, "");

const StyledRow = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 35px;
  max-width: 280px;
  width: 100%;
  & label {
    z-index: 0;
  }

  p {
    margin-left: 5px;
  }

  h2 {
    margin-left: 30px;
  }

  svg {
    margin-right: 25px;
  }
`;

const FormContact = withTheme(styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
`);

const StyledBox = styled(Box)`
  p {
    margin-bottom: 60px;
  }
  max-width: 496px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

interface IFormValues {
  phone: string;
  email: string;
}

const Profile: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const { userData } = user;
  const { passport, snils, contact } = userData;
  const [errorMessage, setErrorMessage] = useState("");
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Данные успешно изменены!" : errorMessage;

  const { t } = useTranslation();

  const phoneMask = (phone = ""): string => {
    const cleaned = cleanPhone(phone);
    const match = cleaned.match(PATTERN);

    if (!match) {
      return "+7";
    }

    const first = match[2] && `(${match[2]}`;
    const second = match[3] && `)${match[3]}`;
    const third = match[4] && `-${match[4]}`;
    const fourth = match[5] && `-${match[5]}`;

    return ["+7", first, second, third, fourth].join("");
  };

  const onSubmit = async ({ email, phone }: IFormValues) => {
    try {
      const uid = firebaseAuth?.currentUser?.uid;
      const cleanedPhone = cleanPhone(phone);

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      await db.ref().update({
        [`users/${uid}`]: {
          ...userData,
          contact: {
            email,
            phone: cleanedPhone,
          },
        },
      });

      const updatedData = await fetchUser();

      setUser({
        ...user,
        userData: updatedData,
      });

      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      onAlertOpen();
    }
  };

  const {
    errors,
    handleSubmit,
    touched,
    getFieldProps,
    setValues,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: contact.email,
      phone: phoneMask(contact.phone),
    },
    validationSchema: yup.object({
      email: emailValidation(
        t("Please enter mail in correct format"),
        t("Enter mail")
      ),
      phone: phoneValidation(
        t("Please enter valid phone number"),
        t(REQUIRED_MESSAGE)
      ),
    }),
    onSubmit,
  });
  useEffect(() => {
    setValues({
      email: contact.email,
      phone: phoneMask(contact.phone),
    });
  }, [contact]);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("phone", phoneMask(event.target.value));
  };

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        {t("Profile")}
      </Typography>
      <FormContact onSubmit={handleSubmit}>
        <Typography variant="h2" color="textPrimary">
          {t("Contacts")}
        </Typography>
        <StyledRow>
          <PhoneRoundedIcon color="action" fontSize="large" />
          <TextField
            fullWidth
            label={t("Phone")}
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handlePhoneChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </StyledRow>
        <StyledRow>
          <EmailRoundedIcon color="action" fontSize="large" />
          <TextField
            fullWidth
            label={"Email"}
            id="email"
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </StyledRow>
        <Box mt={4}>
          <Typography variant="h2" color="textPrimary">
            {t("Documents")}
          </Typography>
          <StyledRow>
            <ListAltRoundedIcon color="action" fontSize="large" />
            <TextField
              fullWidth
              label={t("Passport")}
              disabled
              defaultValue={passport}
            />
          </StyledRow>
          <StyledRow>
            <ListAltRoundedIcon color="action" fontSize="large" />
            <TextField
              fullWidth
              label={t("SNILS")}
              disabled
              defaultValue={snils}
            />
          </StyledRow>
        </Box>
        <StyledBox>
          <Typography variant="body2" color="textSecondary">
            {t(
              "If your passport information has changed, contact the bank branch. To change other data, you can contact the chat"
            )}
          </Typography>
          <PrimaryButton size="large" type="submit">
            {t("Save")}
          </PrimaryButton>
        </StyledBox>
      </FormContact>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </>
  );
};

export default Profile;
