import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationTAT from "./locales/tat/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  tat: {
    translation: translationTAT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tat",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
