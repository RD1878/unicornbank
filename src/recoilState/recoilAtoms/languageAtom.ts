import { atom } from "recoil";

interface ILanguageState {
  language: string;
}

const initialLanguage = "ru";

const languageState = atom<ILanguageState>({
  key: "languageState",
  default: {
    language: initialLanguage,
  },
});

export default languageState;
