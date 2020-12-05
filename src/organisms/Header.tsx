/* eslint react/prop-types: 0 */
import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { theme as appThemes } from "../theme";
import { Link, Switch } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.main};
  height: 100px;
`);

interface IHeader {
  children?: ReactNode;
  onToggleTheme: () => void;
}

const Header: FC<IHeader> = ({ children, onToggleTheme }) => {
  return (
    <Container>
      <Logo />
      <Link href="#" color="textPrimary">
        Главная
      </Link>
      <Link href="#" color="textPrimary">
        История
      </Link>
      <Link href="#" color="textPrimary">
        Чат
      </Link>
      <Link href="#" color="textPrimary">
        Настройки
      </Link>
      <Link href="#" color="textPrimary">
        Офисы и банкоматы
      </Link>

      <Link href="/" color="textPrimary">
        <PrimaryButton>Выйти</PrimaryButton>
      </Link>

      <Switch onChange={onToggleTheme} />
    </Container>
  );
};

export { Header };
