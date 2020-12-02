import React from "react";
import InputMask from "react-input-mask";
import MaterialTextField from "@material-ui/core/TextField";

export const MaskedTextField: React.FC = () => (
  <InputMask mask="+7(999)-999-99-99">
    {() => <MaterialTextField variant="outlined" label="Номер телефона" />}
  </InputMask>
);

export const TextField: React.FC = () => (
  <MaterialTextField variant="outlined" />
);
