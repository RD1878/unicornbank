import React, { FC, useState } from "react";
import styled from "styled-components";
import { db, firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { PrimaryButton, PasswordField, TextField, Logo } from "../../atoms";
import background from "../../assets/images/1-2.png";
import { Snackbar, Link, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ROUTES } from "../../routes";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

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
  height: 45vw;
  min-height: 350px;
  max-height: 640px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 1.75em;
  }

  & > div {
    width: 75%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      margin-bottom: 2em;
    }

    & > a {
      & > p {
        margin-top: 30px;
      }
    }
  }
`);

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Введите Email")
    .email("Введите корректный email"),
  password1: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  password2: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register: FC = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { password1, password2, email } = values;
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
        setOpen(true);
        setTimeout(() => {
          history.push(ROUTES.AUTH);
        }, 2000);
      } catch (error) {
        setErrors({
          email: error.message,
          password1: error.message,
          password2: error.message,
        });
      }
    },
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth onSubmit={formik.handleSubmit}>
        <div>
          <Typography variant="h1" color="textPrimary" align="center">
            Регистрация
          </Typography>
          <div>
            <TextField
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              label="Почта"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <PasswordField
            fullWidth
            error={formik.touched.password1 && Boolean(formik.errors.password1)}
            name="password1"
            value={formik.values.password1}
            onChange={formik.handleChange}
            helperText={formik.touched.password1 && formik.errors.password1}
            label="Введите пароль"
          />
          <PasswordField
            fullWidth
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            helperText={formik.touched.password2 && formik.errors.password2}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Вы успешно зарегистрированы!
        </Alert>
      </Snackbar>
    </BackGround>
  );
};

export default Register;
