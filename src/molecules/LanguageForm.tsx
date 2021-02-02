import { NativeSelect } from "@material-ui/core";
import i18next from "i18next";
import React, { ChangeEvent, FC } from "react";

const LanguageForm: FC = () => {
  const handleChange = (e: ChangeEvent<{ value: string }>) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <NativeSelect defaultValue="ru" onChange={handleChange}>
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="tat">Татарча</option>
    </NativeSelect>
  );
};

export default LanguageForm;
