import * as yup from "yup";

export const passwordValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().min(8, ruleMessage).required(requiredMessage);

export const emailValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().required(requiredMessage).email(ruleMessage);

export const selectValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().min(0, ruleMessage).required(requiredMessage);

export const sumValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().min(0, ruleMessage).required(requiredMessage);

export const phoneValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().min(11, ruleMessage).required(requiredMessage);
