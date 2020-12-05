import React, { ReactElement } from "react";
import InputMask from "react-input-mask";
import MaterialTextField, { TextFieldProps } from "@material-ui/core/TextField";

interface IMaskedTextField {
  mask: string;
  label: string;
}

export const MaskedTextField = ({
  mask,
  label,
  ...rest
}: IMaskedTextField): ReactElement => (
  <InputMask mask={mask}>
    {() => <MaterialTextField variant="outlined" label={label} {...rest} />}
  </InputMask>
);

const TextField = ({ ...props }: TextFieldProps): ReactElement => (
  <MaterialTextField variant="outlined" {...props} />
);

export default TextField;
