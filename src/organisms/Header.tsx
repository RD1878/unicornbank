/* eslint react/prop-types: 0 */
import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.main};
  height: 100px;
`);

const Header: React.FC<React.ReactNode> = ({ children }) => {
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
      <PrimaryButton>Выйти</PrimaryButton>
    </Container>
  );
};

export { Header };
