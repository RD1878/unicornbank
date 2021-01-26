import React, { FC, useState, useEffect, SyntheticEvent } from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { PrimaryButton, TextField } from "../../atoms";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors/userSelector";
import { db, firebaseAuth } from "../../firebase/firebase";
import { saveUser } from "../../actions/user";
import { readUserData } from "./../../firebase/firebase";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { withTheme } from "@material-ui/core/styles";
import { TAlert } from "../../interfaces/main";
import { SHACKBAR_SHOW_DURATION } from "../../constants";
import {
  emailValidation,
  phoneValidation,
} from "./../../utils/validationSchemas";

const StyledRow = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 50px;
  max-width: 280px;
  width: 100%;

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
  margin-bottom: 80px;
`;

const validationSchema = yup.object({
  email: emailValidation,
  phone: phoneValidation,
});

interface IFormValues {
  phone: string;
  email: string;
}

const Profile: FC = () => {
  const { passport, snils, contact } = useSelector(userSelector);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Данные успешно изменены!" : errorMessage;
  const dispatch = useDispatch();

  const onSubmit = async ({ email, phone }: IFormValues) => {
    try {
      const uid = firebaseAuth?.currentUser?.uid;

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      db.ref().update({
        [`users/${uid}`]: {
          contact: {
            email,
            phone,
          },
        },
      });

      const updatedContactInfo = await readUserData(uid);
      dispatch(saveUser(updatedContactInfo));
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      setIsOpenAlert(true);
    }
  };

  const { errors, handleSubmit, touched, getFieldProps, setValues } = useFormik(
    {
      initialValues: {
        email: contact.email,
        phone: contact.phone,
      },
      validationSchema,
      onSubmit,
    }
  );

  useEffect(() => {
    setValues({
      email: contact.email,
      phone: contact.phone,
    });
  }, [contact]);

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Профиль
        </Typography>
        <FormContact mt={6} onSubmit={handleSubmit}>
          <Typography variant="h2" color="textPrimary">
            Контакты
          </Typography>
          <StyledRow>
            <PhoneRoundedIcon color="action" fontSize="large" />
            <TextField
              fullWidth
              label="Телефон"
              id="phone"
              {...getFieldProps("phone")}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </StyledRow>
          <StyledRow>
            <EmailRoundedIcon color="action" fontSize="large" />
            <TextField
              fullWidth
              label="Email"
              id="email"
              {...getFieldProps("email")}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </StyledRow>
          <Box mt={10}>
            <Typography variant="h2" color="textPrimary">
              Документы
            </Typography>
            <StyledRow>
              <ListAltRoundedIcon color="action" fontSize="large" />
              <TextField
                fullWidth
                label="Паспорт"
                disabled
                defaultValue={passport}
              />
            </StyledRow>
            <StyledRow>
              <ListAltRoundedIcon color="action" fontSize="large" />
              <TextField
                fullWidth
                label="СНИЛС"
                disabled
                defaultValue={snils}
              />
            </StyledRow>
          </Box>
          <StyledBox>
            <Typography variant="body2" color="textSecondary">
              Если у вас поменялось ФИО, обратитесь в отделение банка. Для
              изменения других данных Вы можете обратиться в чат.
            </Typography>
            <PrimaryButton size="large" type="submit">
              Сохранить изменения
            </PrimaryButton>
          </StyledBox>
        </FormContact>
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

export default Profile;
