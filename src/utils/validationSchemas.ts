import * as yup from "yup";
import { REQUIRED_MESSAGE } from "../constants";

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

export const selectValidation = yup
  .string()
  .min(11, "Выберите карту")
  .required(REQUIRED_MESSAGE);

export const sumValidation = yup
  .number()
  .min(0, "Введите cумму")
  .required(REQUIRED_MESSAGE);

export const phoneValidation = (
  ruleMessage: string,
  requiredMessage: string
): yup.SchemaOf<string> =>
  yup.string().min(11, ruleMessage).required(requiredMessage);
