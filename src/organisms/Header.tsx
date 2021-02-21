import React, { FC, useState, SyntheticEvent } from "react";
import styled from "styled-components";
import { useTheme, withTheme } from "@material-ui/core/styles";
import { Snackbar, IconButton } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";
import { navigation } from "../routes";
import PrimaryLink from "./../atoms/PrimaryLink";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase/firebase";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "../constants";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../molecules";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";

const Container = withTheme(styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85px;
  margin: auto;
  padding: 0px 30px 0px 50px;
  background-color: ${(props) => props.theme.palette.primary.dark};
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
  const theme = useTheme();
  const { t } = useTranslation();

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
      <Snackbar
        open={error}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {t("An error occured, failed to exit!")}
        </Alert>
      </Snackbar>
      <LinksContainer>
        <Logo />

        {navigation.map((item) => (
          <Link to={item.path} key={item.path}>
            <PrimaryLink component="span">{t(item.name)}</PrimaryLink>
          </Link>
        ))}

        <PrimaryButton onClick={signOut}>{t("Exit")}</PrimaryButton>
      </LinksContainer>
      <LanguageSelect />
      <IconButton onClick={onToggleTheme}>
        {theme.palette.type === "dark" ? (
          <Brightness4RoundedIcon />
        ) : (
          <Brightness7RoundedIcon />
        )}
      </IconButton>
    </Container>
  );
};

export default Header;
