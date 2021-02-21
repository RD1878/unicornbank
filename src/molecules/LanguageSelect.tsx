import {
  FormControl,
  MenuItem,
  Select,
  NativeSelect,
  useMediaQuery,
} from "@material-ui/core";
import i18next from "i18next";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next/";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import languageState from "../recoilState/recoilAtoms/languageAtom";

interface IProps {
  value: unknown;
}

const StyledFormControl = styled(FormControl)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const LanguageSelect: FC = () => {
  const [language, setLanguageState] = useRecoilState(languageState);
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<IProps>) => {
    setLanguageState({ language: e.target.value as string });
    i18next.changeLanguage(e.target.value as string);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {matches ? (
        <FormControl>
          <Select value={language.language} onChange={handleChange}>
            <MenuItem value="" disabled>
              {t("Language")}
            </MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="tat">Татарча</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <StyledFormControl>
          <NativeSelect value={language.language} onChange={handleChange}>
            <option value="" disabled>
              {t("Language")}
            </option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="tat">Татарча</option>
          </NativeSelect>
        </StyledFormControl>
      )}
    </>
  );
};

export default LanguageSelect;
