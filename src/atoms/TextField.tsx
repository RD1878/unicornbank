import React, { FC } from "react";
import InputMask from "react-input-mask";
import MaterialTextField from "@material-ui/core/TextField";

export const MaskedTextField: FC = () => (
  <InputMask mask="+7(999)-999-99-99">
    {() => <MaterialTextField variant="outlined" label="Номер телефона" />}
  </InputMask>
);

export const TextField: FC = () => <MaterialTextField variant="outlined" />;
