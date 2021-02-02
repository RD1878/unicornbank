import React, { FC, useState, SyntheticEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { firebaseAuth } from "../firebase/firebase";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from ".././constants";
import { LanguageForm, MobileDrawer } from "../molecules";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";

const StyledToolbar = withTheme(styled(({ ...props }) => (
  <Toolbar classes={{ regular: "regular" }} {...props} />
))`
  &.regular {
    display: flex;
    justify-content: space-between;
  }
`);

const StyledContainer = styled("div")`
  position: absolute;
  right: 70px;
  width: 140px;
  display: flex;
  justify-content: space-between;
`;

interface IHeader {
  onToggleTheme: () => void;
}

const ProminentAppBar: FC<IHeader> = ({ onToggleTheme }) => {
  const [error, setError] = useState(false);
  const [stateTheme /* setStateTheme */] = useState(true);

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
    <AppBar position="fixed">
      <Snackbar
        open={error}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          Произошла ошибка, не получилось выйти!
        </Alert>
      </Snackbar>
      <StyledToolbar>
        <MobileDrawer />
        <StyledContainer>
          <IconButton onClick={onToggleTheme}>
            {stateTheme ? (
              <Brightness4RoundedIcon />
            ) : (
              <Brightness7RoundedIcon />
            )}
          </IconButton>
          <LanguageForm />
        </StyledContainer>
        <IconButton edge="end" onClick={signOut}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default ProminentAppBar;
