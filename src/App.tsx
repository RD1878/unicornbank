import React, { FC, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { useDispatch } from "react-redux";
import { Auth, MainPage, Profile, Register, Settings } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { getSession, saveUser } from "./actions";
import { firebaseAuth, readUserData } from "./firebase/firebase";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);

  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          throw new Error("Нет активной сессии");
        }

        dispatch(getSession(user));

        const data = await readUserData(user.uid);

        dispatch(saveUser(data));
      } catch (error) {
        dispatch(getSession(null));
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
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
          </MainLayout>
        </ProtectedRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
