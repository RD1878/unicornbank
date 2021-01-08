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

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path={ROUTES.AUTH} exact component={Auth} />
        <Route path={ROUTES.REGISTER} exact component={Register} />
        <Route path="*">
          <MainLayout onToggleTheme={toggleTheme}>
            <Route path={ROUTES.MAIN} exact component={MainPage} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.SETTINGS} component={Settings} />
          </MainLayout>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
