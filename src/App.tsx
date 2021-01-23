import React, { FC, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings, Map } from "./Pages";
import { useDispatch } from "react-redux";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import CardInfo from "./Pages/CardInfo/CardInfo";
import { getSession, getSessionError, saveUser } from "./actions";
import { firebaseAuth, readUserData } from "./firebase/firebase";
import Requisites from "./Pages/Requisites";

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
        dispatch(getSessionError());
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
            <ProtectedRoute path={ROUTES.OFFICES} component={Map} />
            <ProtectedRoute path={ROUTES.CARD} exact component={CardInfo} />
            <ProtectedRoute path={ROUTES.REQUISITES} component={Requisites} />
          </MainLayout>
        </ProtectedRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
