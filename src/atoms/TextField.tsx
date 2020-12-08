import React, { FC } from "react";
import MaterialTextField, { TextFieldProps } from "@material-ui/core/TextField";

export const TextField: FC<TextFieldProps> = (props) => (
  <MaterialTextField variant="outlined" {...props} />
);
