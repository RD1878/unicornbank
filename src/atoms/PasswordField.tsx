import React, { useState, FC } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { OutlinedInputProps } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

interface IPasswordField extends OutlinedInputProps {
  error?: boolean;
  helperText?: string;
  label: string;
  fullWidth?: boolean;
}

const PasswordField: FC<IPasswordField> = ({
  label,
  error,
  helperText,
  fullWidth,
  ...rest
}: IPasswordField) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormControl fullWidth={fullWidth} error={error} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        label={label}
        type={visible ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
