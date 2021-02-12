import * as yup from "yup";

const REQUIRED_MESSAGE = "Обязательно для заполнения";

export const passwordValidation = (
  message = REQUIRED_MESSAGE
): yup.SchemaOf<string> =>
  yup
    .string()
    .min(8, "Пароль должен одержать в себе миниму 8 символов")
    .required(message);

export const emailValidation = yup
  .string()
  .required("Введите почту")
  .email("Введите почту в правильном формате");

export const phoneValidation = yup
  .string()
  .min(11, "Введите корректный номер телефона")
  .required(REQUIRED_MESSAGE);

export const selectValidation = yup
  .string()
  .min(11, "Выберите карту")
  .required(REQUIRED_MESSAGE);

export const sumValidation = yup
  .number()
  .min(0, "Введите cумму")
  .required(REQUIRED_MESSAGE);
