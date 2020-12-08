import React, { FC } from "react";
import MaterialTextField, { TextFieldProps } from "@material-ui/core/TextField";

const TextField: FC<TextFieldProps> = (props) => (
  <MaterialTextField variant="outlined" {...props} />
);

export default TextField;
