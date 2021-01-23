import React, { FC, useState } from "react";
import styled from "styled-components";
import { firebaseAuth } from "../../firebase/firebase";
import { withTheme } from "@material-ui/core/styles";
import { Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import background from "../../assets/images/1-2.png";
import { TextField, PrimaryButton, PasswordField, Logo } from "../../atoms";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../actions/user";
import { readUserData } from "./../../firebase/firebase";
import { useFormik } from "formik";
import * as yup from "yup";

export type TAlert = "success" | "error";

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
    .required("Введите почту")
    .email("Введите почту в правильном формате"),
  password: yup
    .string()
    .min(8, "Пароль должен одержать в себе миниму 8 символов")
    .required("Обязательно для заполнения"),
});

interface IFormValues {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (formData: IFormValues) => {
    try {
      const { email, password } = formData;
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      const uid = firebaseAuth?.currentUser?.uid;
      if (!uid) {
        throw new Error("Некорректный id");
      }
      const data = await readUserData(uid);
      dispatch(saveUser(data));
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    }
  };

  const { errors, handleChange, handleSubmit, values, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenAlert(false);
  };

  return (
    <BackGround>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <FormAuth onSubmit={handleSubmit}>
        <Typography variant="h1" color="textPrimary" align="center">
          Вход в личный кабинет
        </Typography>
        <TextField
          fullWidth
          error={touched.email && Boolean(errors.email)}
          label="Почта"
          name="email"
          value={values.email}
          onChange={handleChange}
          helperText={touched.email && errors.email}
        />
        <PasswordField
          label="Пароль"
          error={touched.password && Boolean(errors.password)}
          name="password"
          value={values.password}
          onChange={handleChange}
          helperText={touched.password && errors.password}
        />
        <PrimaryButton size="large" type="submit">
          Войти
        </PrimaryButton>
      </FormAuth>
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertType} onClose={handleClose}>
          {alertType === "success"
            ? "Вы успешно зарегистрированы!"
            : errorMessage}
        </Alert>
      </Snackbar>
    </BackGround>
  );
};

export default Auth;
