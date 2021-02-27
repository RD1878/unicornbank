import { NOT_NUMBER_REGEX, PATTERN } from "../Pages/Profile/Profile";

export const cleanPhone = (phone: string): string =>
  phone.replace(NOT_NUMBER_REGEX, "");

export const phoneMask = (phone: string): string => {
  const cleaned = cleanPhone(phone);
  const match = cleaned.match(PATTERN);

  if (!match) {
    return "+7";
  }

  const first = match[2] && `(${match[2]}`;
  const second = match[3] && `)${match[3]}`;
  const third = match[4] && `-${match[4]}`;
  const fourth = match[5] && `-${match[5]}`;

  return ["+7", first, second, third, fourth].join("");
};
