import React, { FC, useState, useEffect } from "react";
import { Snackbar, ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings, Map } from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import CardInfo from "./Pages/CardInfo/CardInfo";
import Requisites from "./Pages/Requisites";
import { getSession, getSessionError, requestUser } from "./actions";
import { firebaseAuth } from "./firebase/firebase";
import { Alert } from "@material-ui/lab";
import { authSelector } from "./selectors";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);
  const [isOpen, setOpen] = useState(false);
  const { errorMessage } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(getSessionError("Нет активной сессии"));
      }

      dispatch(getSession(user));
      dispatch(requestUser());
    });
  }, []);

  useEffect(() => {
    if (errorMessage.length) {
      setOpen(true);
    }
  }, [errorMessage]);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path={ROUTES.AUTH} exact component={Auth} />
        <Route path={ROUTES.REGISTER} exact component={Register} />
        <ProtectedRoute path="*">
          <MainLayout onToggleTheme={toggleTheme}>
            <ProtectedRoute path={ROUTES.MAIN} exact component={MainPage} />
            <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute path={ROUTES.SETTINGS} component={Settings} />
            <ProtectedRoute path={ROUTES.OFFICES} component={Map} />
            <ProtectedRoute path={ROUTES.CARD} exact component={CardInfo} />
            <ProtectedRoute path={ROUTES.REQUISITES} component={Requisites} />
          </MainLayout>
        </ProtectedRoute>
      </Switch>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
