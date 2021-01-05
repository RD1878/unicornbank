import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  // const path = window.location.pathname;

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path={ROUTES.auth} component={Auth} />
        <Route path={ROUTES.register} component={Register} />
        <Route
          path={ROUTES.main}
          exact
          render={() => (
            <MainLayout onToggleTheme={toggleTheme}>
              <MainPage />
            </MainLayout>
          )}
        />
        <Route
          path={ROUTES.profile}
          render={() => (
            <MainLayout onToggleTheme={toggleTheme}>
              <Profile />
            </MainLayout>
          )}
        />
        <Route
          path={ROUTES.settings}
          render={() => (
            <MainLayout onToggleTheme={toggleTheme}>
              <Settings />
            </MainLayout>
          )}
        />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
