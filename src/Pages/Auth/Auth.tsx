import React, { FC } from "react";
import styled from "styled-components";
import { firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import background from "../../assets/images/1-2.png";
import { TextField, PrimaryButton, PasswordField, Logo } from "../../atoms";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../actions/user";
import { readUserData } from "./../../firebase/firebase";
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
    margin-bottom: 2em;
  }
`);

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Введите Email")
    .email("Введите корректный email"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Auth: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const { email, password } = values;
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        const uid = firebaseAuth?.currentUser?.uid;
        if (!uid) {
          throw new Error("Invalid id");
        }
        const data = await readUserData(uid);
        dispatch(saveUser(data));
        history.push("/");
      } catch (error) {
        setErrors({
          email: error.message,
          password: error.message,
        });
      }
    },
  });

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth onSubmit={formik.handleSubmit}>
        <Typography variant="h1" color="textPrimary" align="center">
          Вход в личный кабинет
        </Typography>
        <TextField
          fullWidth
          error={formik.touched.email && Boolean(formik.errors.email)}
          label="Почта"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordField
          label="Введите пароль"
          error={formik.touched.password && Boolean(formik.errors.password)}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          helperText={formik.touched.password && formik.errors.password}
        />
        <PrimaryButton size="large" type="submit">
          Войти
        </PrimaryButton>
      </FormAuth>
    </BackGround>
  );
};

export default Auth;
