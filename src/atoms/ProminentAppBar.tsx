import React, { FC, useState, SyntheticEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { useTheme, withTheme } from "@material-ui/core/styles";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { firebaseAuth } from "../firebase/firebase";
import { Box, Snackbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from ".././constants";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

const StyledToolbar = withTheme(styled(({ ...props }) => (
  <Toolbar classes={{ regular: "regular" }} {...props} />
))`
  &.regular {
    display: flex;
    justify-content: space-between;
  }
`);

export interface IHeader {
  onToggleTheme: () => void;
  onToggleMobileDrawer: () => void;
}

const ProminentAppBar: FC<IHeader> = ({
  onToggleTheme,
  onToggleMobileDrawer,
}) => {
  const [error, setError] = useState(false);
  const theme = useTheme();
  const history = useHistory();

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

  const handleClick = (): void => {
    history.goBack();
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
        <Box>
          <IconButton
            onClick={onToggleMobileDrawer}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={onToggleTheme}>
            {theme.palette.type === "dark" ? (
              <Brightness4RoundedIcon />
            ) : (
              <Brightness7RoundedIcon />
            )}
          </IconButton>
        </Box>
        <IconButton edge="end" onClick={signOut}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default ProminentAppBar;
