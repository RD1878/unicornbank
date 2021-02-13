import { FormControl, NativeSelect } from "@material-ui/core";
import i18next from "i18next";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next/";
import styled from "styled-components";

interface IProps {
  value: unknown;
}

const StyledFormControl = styled(FormControl)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const LanguageMobileSelect: FC = () => {
  const [language, setLanguage] = React.useState("ru");
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<IProps>) => {
    setLanguage(e.target.value as string);
    i18next.changeLanguage(e.target.value as string);
  };

  return (
    <StyledFormControl>
      <NativeSelect value={language} onChange={handleChange}>
        <option value="" disabled>
          {t("Language")}
        </option>
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="tat">Татарча</option>
      </NativeSelect>
    </StyledFormControl>
  );
};

export default LanguageMobileSelect;
