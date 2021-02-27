import React, { FC, useState, SyntheticEvent } from "react";
import styled from "styled-components";
import { useTheme, withTheme } from "@material-ui/core/styles";
import { Snackbar, IconButton } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";
import { firebaseAuth } from "../firebase/firebase";
import { Alert } from "@material-ui/lab";
import { DRAWER_BANKCHATS_WIDTH, SHACKBAR_SHOW_DURATION } from "../constants";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../molecules";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0px 30px 0px 50px;
  width: calc(100% - ${DRAWER_BANKCHATS_WIDTH}px);
  margin-left: auto;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const ControlsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 15vw;
  max-width: 150px;
  justify-content: space-evenly;
  align-items: center;
`;

interface IHeaderBank {
  onToggleTheme: () => void;
}

const HeaderBank: FC<IHeaderBank> = ({ onToggleTheme }) => {
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

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
      <Logo />
      <ControlsContainer>
        <LanguageSelect />
        <IconButton onClick={onToggleTheme}>
          {theme.palette.type === "dark" ? (
            <Brightness4RoundedIcon />
          ) : (
            <Brightness7RoundedIcon />
          )}
        </IconButton>
      </ControlsContainer>
      <PrimaryButton onClick={signOut}>{t("Exit")}</PrimaryButton>
    </Container>
  );
};

export default HeaderBank;
