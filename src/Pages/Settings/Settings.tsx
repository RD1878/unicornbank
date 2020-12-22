import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
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

const Title = withTheme(styled(Typography)`
  margin-top: 40px;
  border: 2px solid ${(props) => props.theme.palette.WHITE};
  border-radius: 10px;
  max-width: 496px;
  width: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
`);

const Settings: FC = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Настройки
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Вход
        </Typography>
        <Title variant="body2" color="textPrimary">
          Смена пароля
        </Title>
        <StyledColumn>
          <PasswordField name="password1" label="Введите текущий пароль" />
          <PasswordField name="password1" label="Введите новый пароль" />
          <PasswordField name="password1" label="Повторите новый пароль" />
          <Typography variant="body2" color="textSecondary">
            Если Вы забыли логин, обратитесь в отделение банка. Для изменения
            других данных Вы можете обратиться в чат.
          </Typography>
          <PrimaryButton size="large">Сохранить изменения </PrimaryButton>
        </StyledColumn>
      </Box>
    </Container>
  );
};

export default Settings;
