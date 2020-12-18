import React, { FC, useState } from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { PasswordField } from "../../atoms";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PrimaryButton from "./../../atoms/PrimaryButton";

enum SelectValue {
  Login,
  Password,
}

const StyledRow = withTheme(styled("div")`
  display: flex;
  align-items: center;
  margin-top: 50px;
`);

const StyledColumn = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  margin-right: 30px;

  & > div {
    margin-bottom: 20px;
  }
`);

const Settings: FC = () => {
  const [selectValue, setSelectValue] = useState(SelectValue.Login);

  const onSelectChange = (event: any) => {
    const { value: newValue } = event.target;

    setSelectValue(newValue);
  };

  return (
    <Container>
      <Box>
        <Typography variant="h1" color="textPrimary">
          Настройки
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Вход
        </Typography>
        <StyledRow>
          <StyledColumn>
            <Select
              variant="outlined"
              value={selectValue}
              onChange={onSelectChange}
            >
              <MenuItem value={SelectValue.Login}>Смена логина</MenuItem>
              <MenuItem value={SelectValue.Password}>Смена пароля</MenuItem>
            </Select>
            {selectValue === SelectValue.Login ? (
              <>
                <TextField fullWidth label="Текущий логин" name="email1" />
                <TextField fullWidth label="Новый логин" name="email2" />
                <TextField fullWidth label="Повторите логин" name="email3" />
              </>
            ) : (
              <>
                <PasswordField label="Текущий пароль" />
                <PasswordField label="Новый пароль" />
                <PasswordField label="Повторите пароль" />
              </>
            )}
          </StyledColumn>
        </StyledRow>
        <PrimaryButton>Сохраниить изменения</PrimaryButton>
      </Box>
    </Container>
  );
};

export default Settings;
