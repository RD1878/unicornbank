import React, { FC, useState, useEffect } from "react";
import { Snackbar, ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings, Map } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "./constants";
import { useRecoilValue } from "recoil";
import authState from "./recoilState/recoilAtoms/authAtom";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);
  const [isOpen, setOpen] = useState(false);
  const { errorMessage } = useRecoilValue(authState);

  // useEffect(() => {
  //   getCurrency();
  // }, []);

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
          </MainLayout>
        </ProtectedRoute>
      </Switch>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isOpen}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
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
