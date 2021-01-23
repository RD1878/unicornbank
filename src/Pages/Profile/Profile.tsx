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

export type TAlert = "success" | "error";

const StyledRow = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 50px;

  p {
    margin-left: 5px;
  }

  h2 {
    margin-left: 30px;
  }

  svg {
    margin-right: 25px;
  }

  .MuiTextField-root {
    max-width: 230px;
    width: 100%;
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
  email: yup
    .string()
    .required("Enter Email")
    .email("Please enter a valid email"),
  phone: yup
    .number()
    .min(11, "Please enter a valid phone")
    .required("Phone is required"),
});

const Profile: FC = () => {
  const { passport, snils, contact } = useSelector(userSelector);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const dispatch = useDispatch();

  useEffect(() => {
    formik.setValues({
      email: contact.email,
      phone: contact.phone,
    });
  }, [contact]);

  const formik = useFormik({
    initialValues: {
      email: contact.email,
      phone: contact.phone,
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const uid = firebaseAuth?.currentUser?.uid;

        if (!uid) {
          throw new Error("Пользователь не найден");
        }

        db.ref().update({
          [`users/${uid}`]: {
            contact: {
              email: values.email,
              phone: values.phone,
            },
          },
        });
        const updatedContactInfo = await readUserData(uid);
        dispatch(saveUser(updatedContactInfo));
        setAlertType("success");
      } catch (error) {
        setErrors({
          phone: error.message,
          email: error.message,
        });
        setErrorMessage(error.message);
      } finally {
        setIsOpenAlert(true);
      }
    },
  });

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
        <FormContact mt={6} onSubmit={formik.handleSubmit}>
          <Typography variant="h2" color="textPrimary">
            Контакты
          </Typography>
          <StyledRow>
            <PhoneRoundedIcon color="action" fontSize="large" />
            <TextField
              label="Телефон"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </StyledRow>
          <StyledRow>
            <EmailRoundedIcon color="action" fontSize="large" />
            <TextField
              label="Email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </StyledRow>
          <Box mt={10}>
            <Typography variant="h2" color="textPrimary">
              Документы
            </Typography>
            <StyledRow>
              <ListAltRoundedIcon color="action" fontSize="large" />
              <TextField label="Паспорт" disabled defaultValue={passport} />
            </StyledRow>
            <StyledRow>
              <ListAltRoundedIcon color="action" fontSize="large" />
              <TextField label="СНИЛС" disabled defaultValue={snils} />
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
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alertType} onClose={handleCloseAlert}>
            {alertType === "success"
              ? "Данные успешно изменены!"
              : errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Profile;
