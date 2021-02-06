import React, { FC, useState } from "react";
import styled from "styled-components";
import { db, firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import {
  PrimaryButton,
  PasswordField,
  TextField,
  Logo,
  PrimaryAlert,
} from "../../atoms";
import background from "../../assets/images/1-2.png";
import { Link, Typography } from "@material-ui/core";
import { ROUTES } from "../../routes";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { TAlert } from "../../interfaces/main";
import {
  passwordValidation,
  emailValidation,
} from "../../utils/validationSchemas";
import { useAlert } from "../../utils/useAlert";

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
`);

const StyledTextField = withTheme(styled(({ ...props }) => (
  <TextField classes={{ root: "root" }} {...props} />
))`
  &.root {
    width: 100%;
    margin-bottom: 1.75em;

    ${(props) => props.theme.breakpoints.down("lg")} {
      margin-bottom: 1em;
    }
  }
`);

const StyledPasswordField = withTheme(styled(({ ...props }) => (
  <PasswordField classes={{ root: "root" }} {...props} />
))`
  &.root {
    width: 100%;
    margin-bottom: 1.75em;

    ${(props) => props.theme.breakpoints.down("lg")} {
      margin-bottom: 1em;
    }
  }
`);

const validationSchema = yup.object({
  email: emailValidation,
  password1: passwordValidation("Придумайте пароль"),
  password2: passwordValidation("Повторите пароль"),
});

interface IFormValues {
  email: string;
  password1: string;
  password2: string;
}

const Register: FC = () => {
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Вы успешно зарегистрированы!" : errorMessage;
  const history = useHistory();

  const onSubmit = async (formData: IFormValues) => {
    try {
      const { password1, password2, email } = formData;
      if (password1 !== password2) throw new Error("Пароли не совпадают");
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password2
      );
      if (!res?.user?.uid) {
        throw new Error("Ошибка");
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
      onAlertOpen();
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
    validationSchema,
    onSubmit,
  });

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth onSubmit={handleSubmit}>
        <div>
          <Typography variant="h1" color="textPrimary" align="center">
            Регистрация
          </Typography>
          <StyledTextField
            fullWidth
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors.email)}
            label="Почта"
            helperText={touched.email && errors.email}
          />
          <StyledPasswordField
            fullWidth
            error={touched.password1 && Boolean(errors.password1)}
            {...getFieldProps("password1")}
            helperText={touched.password1 && errors.password1}
            label="Введите пароль"
          />
          <StyledPasswordField
            fullWidth
            error={touched.password2 && Boolean(errors.password2)}
            {...getFieldProps("password2")}
            helperText={touched.password2 && errors.password2}
            label="Повторите пароль"
          />
          <PrimaryButton type="submit" size="large">
            Зарегистрироваться
          </PrimaryButton>
          <Link href={ROUTES.AUTH} color="textPrimary">
            <Typography variant="body2" color="textPrimary" align="center">
              У вас уже есть аккаунт?
            </Typography>
          </Link>
        </div>
      </FormAuth>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </BackGround>
  );
};

export default Register;
