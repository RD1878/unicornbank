import React from "react";
import styled from "styled-components";
import backGround from "../../assets/images/1-2.png";
import logo from "../../assets/images/logo.png";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const darkBlue = "rgba(20, 33, 61, 0.5)";

const BackGround = styled.div`
  background-image: url(${backGround});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: 127px;
  height: 56px;
  position: absolute;
  top: 0;
  left: ;
`;

const FormAuth = styled.div`
  min-width: 30vw;
  background-color: ${darkBlue};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  padding: 15rem 17rem;
`;

const Title = styled.div`
  color: #ffffff;
  margin-bottom: 5rem;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

export const Auth: React.FC = () => {
  return (
    <BackGround>
      <Logo></Logo>
      <FormAuth>
        <Title>Вход в личный кабинет</Title>
        <TextField
          id="outlined-basic"
          label="Логин/телефон"
          variant="outlined"
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // type={values.showPassword ? "text" : "password"}
            // value={values.password}
            // onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  // edge="end"
                >
                  {true ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </FormAuth>
    </BackGround>
  );
};
