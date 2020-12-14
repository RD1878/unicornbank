import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import { Auth, MainPage } from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  const path = window.location.pathname;

  function routing() {
    switch (path) {
      case "/main":
        return (
          <MainLayout onToggleTheme={toggleTheme}>
            <MainPage />
          </MainLayout>
        );

      default:
        return <Auth />;
    }
  }

  return <ThemeProvider theme={theme}>{routing()}</ThemeProvider>;
};

export default App;
