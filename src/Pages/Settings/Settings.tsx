import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { PrimaryButton, PasswordField } from "../../atoms";

const StyledColumn = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  max-width: 496px;

  & > div {
    margin-bottom: 30px;
    width: 100%;
  }

  p {
    margin-bottom: 60px;
  }
`;

const StyledBox = styled(Box)`
  p {
    margin-bottom: 60px;
  }
  max-width: 496px;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Settings: FC = () => (
  <Container>
    <Box mt={5}>
      <Typography variant="h1" color="textPrimary">
        Настройки
      </Typography>
      <Typography variant="subtitle1" color="textPrimary">
        Смена пароля
      </Typography>
      <StyledColumn>
        <PasswordField name="password1" label="Введите текущий пароль" />
        <PasswordField name="password2" label="Введите новый пароль" />
        <PasswordField name="password3" label="Повторите новый пароль" />
      </StyledColumn>
      <StyledBox>
        <Typography variant="body2" color="textSecondary">
          Если у вас поменялся логин или вы забыли пароль, обратитесь в
          отделение банка. Для изменения других данных Вы можете обратиться в
          чат.
        </Typography>
        <PrimaryButton size="large">Сохранить изменения </PrimaryButton>
      </StyledBox>
    </Box>
  </Container>
);

export default Settings;
