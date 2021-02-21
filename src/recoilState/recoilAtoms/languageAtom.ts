import { atom, AtomEffect } from "recoil";

interface ILanguageState {
  language: string;
}

const initialLanguage = "ru";

const languageEffect: AtomEffect<ILanguageState> = ({ onSet }) => {
  onSet((newLanguage) => newLanguage);
};

const languageState = atom<ILanguageState>({
  key: "languageState",
  default: {
    language: initialLanguage,
  },
  effects_UNSTABLE: [languageEffect],
});

export default languageState;
