import React from "react";
import styled from "styled-components";
import InputMask from "react-input-mask";
import MaterialTextField from "@material-ui/core/TextField";

const StyledTextField = styled(MaterialTextField)`
  .PrivateNotchedOutline-root-1 {
    border-radius: 10px;
    border-width: 2px !important;
  }
`;

export const MaskedTextField: React.FC = () => (
  <InputMask mask="+7(999)-999-99-99">
    {() => <StyledTextField variant="outlined" label="Номер телефона" />}
  </InputMask>
);

export const TextField: React.FC = () => <StyledTextField variant="outlined" />;
