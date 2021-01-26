import React, { FC, useState, SyntheticEvent } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { Switch, Snackbar } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";
import { navigation } from "../routes";
import PrimaryLink from "./../atoms/PrimaryLink";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase/firebase";
import { Alert } from "@material-ui/lab";

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
  const [error, setError] = useState(false);

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setError(false);
  };

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Container>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error" onClose={handleCloseAlert}>
          Произошла ошибка, не получилось выйти!
        </Alert>
      </Snackbar>

      <SidebarHeader>
        <ArrowBackRoundedIcon color="secondary" />
      </SidebarHeader>
      <LinksContainer>
        <Logo />

        {navigation.map((item) => (
          <Link to={item.path} key={item.path}>
            <PrimaryLink component="span">{item.name}</PrimaryLink>
          </Link>
        ))}

        <PrimaryButton onClick={signOut}>Выйти</PrimaryButton>
      </LinksContainer>

      <Switch onChange={onToggleTheme} />
    </Container>
  );
};

export default Header;
