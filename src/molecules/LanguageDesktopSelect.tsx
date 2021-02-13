import { FormControl, MenuItem, Select } from "@material-ui/core";
import i18next from "i18next";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next/";

interface IProps {
  value: unknown;
}

const LanguageDesktopSelect: FC = () => {
  const [language, setLanguage] = React.useState("ru");
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<IProps>) => {
    setLanguage(e.target.value as string);
    i18next.changeLanguage(e.target.value as string);
  };

  return (
    <FormControl>
      <Select value={language} onChange={handleChange}>
        <MenuItem value="" disabled>
          {t("Language")}
        </MenuItem>
        <MenuItem value="ru">Русский</MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="tat">Татарча</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageDesktopSelect;
