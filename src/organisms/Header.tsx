import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { Switch } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";
import { navigation } from "../routes";
import { Link } from "react-router-dom";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0px 30px 0px 50px;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const SidebarHeader = withTheme(styled("div")`
  max-width: 300px;
  display: flex;

  a {
    margin-left: 40px;
  }
`);

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 0.5;
`;

interface IHeader {
  onToggleTheme: () => void;
}

const Header: FC<IHeader> = ({ onToggleTheme }) => {
  return (
    <Container>
      <SidebarHeader>
        <ArrowBackRoundedIcon color="secondary" />
      </SidebarHeader>
      <LinksContainer>
        <Logo />

        {navigation.map((item) => (
          <Link to={item.path} key={item.path}>
            {item.name}
          </Link>
        ))}

        <Link to="/auth" color="textPrimary">
          <PrimaryButton>Выйти</PrimaryButton>
        </Link>
      </LinksContainer>

      <Switch onChange={onToggleTheme} />
    </Container>
  );
};

export default Header;
