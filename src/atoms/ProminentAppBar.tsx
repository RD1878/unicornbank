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
import { MobileDrawer } from "../molecules";

const StyledToolbar = withTheme(styled(({ ...props }) => (
  <Toolbar classes={{ regular: "regular" }} {...props} />
))`
  &.regular {
    display: flex;
    justify-content: space-between;
  }
`);

const ProminentAppBar: FC = () => {
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
        <IconButton edge="end" onClick={signOut}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default ProminentAppBar;
