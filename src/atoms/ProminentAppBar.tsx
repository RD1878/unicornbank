import React, { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
// import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
// import PrimaryButton from "./PrimaryButton";
// import { firebaseAuth } from "../firebase/firebase";

const StyledToolbar = withTheme(styled(Toolbar)`
  &.MuiToolbar-regular {
    display: flex;
    justify-content: space-between;
  }
`);

const ProminentAppBar: FC = () => {
  // const [error, setError] = useState(false);

  // const signOut = async () => {
  //   try {
  //     await firebaseAuth.signOut();
  //   } catch (error) {
  //     setError(true);
  //   }
  // };
  return (
    <AppBar position="fixed">
      <StyledToolbar>
        <Link to={ROUTES.PROFILE}>
          <IconButton edge="start" aria-label="open drawer">
            <AccountCircleRoundedIcon />
          </IconButton>
        </Link>
        <Link to={ROUTES.MAIN}>
          {/* <IconButton
            aria-label="display more actions"
            edge="end"
            onClick={signOut}
          >
            <ExitToAppRoundedIcon />
          </IconButton> */}
        </Link>
      </StyledToolbar>
    </AppBar>
  );
};

export default ProminentAppBar;
