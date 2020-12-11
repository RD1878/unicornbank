import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { Link, Switch } from "@material-ui/core";
import { PrimaryButton, PrimaryLink, Logo } from "../atoms";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0px 30px 0px 50px;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 0.5;
`;

const path = window.location.pathname;

interface IHeader {
  onToggleTheme: () => void;
}

const Header: FC<IHeader> = ({ onToggleTheme }) => {
  return (
    <Container>
      <ArrowForwardRoundedIcon color="secondary" />
      <LinksContainer>
        <Logo />
        <PrimaryLink href="#" active={path === "/main" ? true : false}>
          Главная
        </PrimaryLink>
        <PrimaryLink href="#">История</PrimaryLink>
        <PrimaryLink href="#">Чат</PrimaryLink>
        <PrimaryLink href="#">Настройки</PrimaryLink>
        <PrimaryLink href="#">Офисы и банкоматы</PrimaryLink>

        <Link href="/" color="textPrimary">
          <PrimaryButton>Выйти</PrimaryButton>
        </Link>
      </LinksContainer>

      <Switch onChange={onToggleTheme} />
    </Container>
  );
};

export default Header;
