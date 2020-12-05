import React, { FC } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const PasswordField: FC = () => (
  <FormControl variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility">
            {true ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      labelWidth={70}
    />
  </FormControl>
);

export default PasswordField;
