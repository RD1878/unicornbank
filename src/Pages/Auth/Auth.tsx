import React, { FC, useState, SyntheticEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import {
  Typography,
  Snackbar,
  FormControl,
  Link,
  NativeSelect,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import background from "../../assets/images/1-2.png";
import { TextField, PrimaryButton, PasswordField, Logo } from "../../atoms";
import { useHistory } from "react-router-dom";
import { readUserData } from "./../../firebase/firebase";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/main";
import { ROUTES } from "../../routes";
import {
  emailValidation,
  passwordValidation,
} from "../../utils/validationSchemas";
import { useSetRecoilState } from "recoil";
import userState from "./../../recoilState/recoilAtoms/userAtom";
import {
  REQUIRED_MESSAGE,
  SHACKBAR_SHOW_DURATION,
  ELEMENT,
} from "../../constants";
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

const StyledFormControl = styled(FormControl)`
  position: absolute;
  top: 30px;
  right: 3%;
`;

const StyledLogo = styled.div`
  display: block;
  position: absolute;
  top: 30px;
  left: 3%;
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
  height: 45vw;
  min-height: 350px;
  max-height: 640px;
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
  & > a {
    margin-top: 30px;
  }
  & > div {
    width: 75%;
    max-width: 500px;
    margin-bottom: 2em;
  }
`);

interface IFormValues {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("You have successfully signed in to your account!")}`
      : errorMessage;
  const history = useHistory();
  const setUserState = useSetRecoilState(userState);

  const onSubmit = async (formData: IFormValues) => {
    try {
      const { email, password } = formData;
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      const uid = firebaseAuth?.currentUser?.uid;
      if (!uid) {
        throw new Error(t("Invalid id"));
      }
      const data = await readUserData(uid);

      setUserState({
        userData: data,
        errorMessage: "",
      });

      history.push(ROUTES.MAIN);
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    }
  };

  const { errors, handleSubmit, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: emailValidation(
        t("Please enter mail in correct format"),
        t("Enter mail")
      ),
      password: passwordValidation(
        t("Password must contain at least 8 characters"),
        t(REQUIRED_MESSAGE)
      ),
    }),
    onSubmit,
  });

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
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
        <Typography variant="h1" color="textPrimary" align="center">
          {t("Login to your personal account")}
        </Typography>
        <TextField
          data-test-id={ELEMENT.loginEmail}
          fullWidth
          error={touched.email && Boolean(errors.email)}
          label={t("Email")}
          {...getFieldProps("email")}
          helperText={touched.email && errors.email}
        />
        <PasswordField
          data-test-id={ELEMENT.password}
          label={t("Password")}
          error={touched.password && Boolean(errors.password)}
          {...getFieldProps("password")}
          helperText={touched.password && errors.password}
        />
        <PrimaryButton
          data-test-id={ELEMENT.loginButton}
          size="large"
          type="submit"
        >
          {t("Login")}
        </PrimaryButton>
        <Link href={ROUTES.REGISTER} color="textPrimary">
          <Typography variant="body2" color="textPrimary" align="center">
            {t("Don't have an account yet?")}
          </Typography>
        </Link>
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

export default Auth;
