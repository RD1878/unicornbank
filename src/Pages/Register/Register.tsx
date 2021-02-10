import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { db, firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { PrimaryButton, PasswordField, TextField, Logo } from "../../atoms";
import background from "../../assets/images/1-2.png";
import {
  Snackbar,
  Link,
  Typography,
  FormControl,
  NativeSelect,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ROUTES } from "../../routes";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/main";
import { SHACKBAR_SHOW_DURATION } from "../../constants";
import {
  passwordValidation,
  emailValidation,
} from "../../utils/validationSchemas";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const BackGround = styled.div`
  background-image: url(${background});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.div`
  display: block;
  position: absolute;
  top: 30px;
  left: 3%;
`;

const StyledFormControl = styled(FormControl)`
  position: absolute;
  top: 30px;
  right: 3%;
`;

const FormAuth = withTheme(styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `${props.theme.palette.primary.main}50`};
  border-radius: 20px;
  width: 55vw;
  min-width: 300px;
  max-width: 800px;
  height: 50vw;
  min-height: 400px;
  max-height: 700px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 1.75em;
    ${(props) => props.theme.breakpoints.down("lg")} {
      margin-bottom: 1em;
    }
  }

  & > div {
    width: 75%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > a {
      & > p {
        margin-top: 30px;
      }
    }
  }
  & > div {
    & > div {
      margin-bottom: 1.75em;

      ${(props) => props.theme.breakpoints.down("lg")} {
        margin-bottom: 1em;
      }
    }
  }
`);

const StyledTextField = withTheme(styled(({ ...props }) => (
  <TextField classes={{ root: "root" }} {...props} />
))`
  &.root {
    width: 100%;
  }
`);

const StyledPasswordField = withTheme(styled(({ ...props }) => (
  <PasswordField classes={{ root: "root" }} {...props} />
))`
  &.root {
    width: 100%;
  }
`);

interface IFormValues {
  email: string;
  password1: string;
  password2: string;
}

const Register: FC = () => {
  const { t } = useTranslation();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("You have successfully registered!")}`
      : errorMessage;
  const history = useHistory();

  const onSubmit = async (formData: IFormValues) => {
    try {
      const { password1, password2, email } = formData;
      if (password1 !== password2) throw new Error(t("Passwords do not match"));
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password2
      );
      if (!res?.user?.uid) {
        throw new Error(t("Error"));
      }
      const { uid, email: userEmail } = res.user;
      db.ref("users").child(uid).push().key;
      db.ref().update({
        [`users/${uid}`]: {
          contact: {
            email: userEmail,
          },
          createdAt: new Date(),
          email: email,
        },
      });
      setIsOpenAlert(true);
      setTimeout(() => {
        history.push(ROUTES.AUTH);
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    }
  };

  const { errors, handleSubmit, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: yup.object({
      email: emailValidation(
        t("Please enter mail in correct format"),
        t("Enter mail")
      ),
      password1: passwordValidation(
        t("Password must contain at least 8 characters"),
        t("Create your password")
      ),
      password2: passwordValidation(
        t("Password must contain at least 8 characters"),
        t("Repeat your password")
      ),
    }),
    onSubmit,
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenAlert(false);
  };

  const handleChange = (e: ChangeEvent<{ value: string }>) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <StyledFormControl>
        <NativeSelect defaultValue="ru" onChange={handleChange}>
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="tat">Татарча</option>
        </NativeSelect>
      </StyledFormControl>
      <FormAuth onSubmit={handleSubmit}>
        <div>
          <Typography variant="h1" color="textPrimary" align="center">
            {t("Registration")}
          </Typography>
          <StyledTextField
            fullWidth
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors.email)}
            label={t("Email")}
            helperText={touched.email && errors.email}
          />
          <StyledPasswordField
            fullWidth
            error={touched.password1 && Boolean(errors.password1)}
            {...getFieldProps("password1")}
            helperText={touched.password1 && errors.password1}
            label={t("Enter the current password")}
          />
          <StyledPasswordField
            fullWidth
            error={touched.password2 && Boolean(errors.password2)}
            {...getFieldProps("password2")}
            helperText={touched.password2 && errors.password2}
            label={t("Confirm password")}
          />
          <PrimaryButton type="submit" size="large">
            {t("Register")}
          </PrimaryButton>
          <Link href={ROUTES.AUTH} color="textPrimary">
            <Typography variant="body2" color="textPrimary" align="center">
              {t("Do you already have an account?")}
            </Typography>
          </Link>
        </div>
      </FormAuth>
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertType} onClose={handleClose}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </BackGround>
  );
};

export default Register;
