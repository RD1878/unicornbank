import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage, Profile, Register, Settings } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { routes } from "./routes";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  const path = window.location.pathname;

  function routing() {
    switch (path) {
      case routes.main:
        return (
          <MainLayout onToggleTheme={toggleTheme}>
            <MainPage />
          </MainLayout>
        );

      case routes.auth:
        return <Auth />;

      case routes.profile:
        return (
          <MainLayout onToggleTheme={toggleTheme}>
            <Profile />
          </MainLayout>
        );

      case routes.settings:
        return (
          <MainLayout onToggleTheme={toggleTheme}>
            <Settings />
          </MainLayout>
        );

      default:
        return <Register />;
    }
  }

  return <ThemeProvider theme={theme}>{routing()}</ThemeProvider>;
};

export default App;
