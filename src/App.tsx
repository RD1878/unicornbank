import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Provider } from "react-redux";
import store from "./store/store";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
