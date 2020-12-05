import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme as appThemes } from "./theme";
import { Auth } from "./Pages";
import { MainLayout } from "./Pages/layouts/main";

const App: FC = () => {
  const [theme] = useState(appThemes.dark);
  const path = window.location.pathname;

  function routing() {
    switch (path) {
      case "/main":
        return <MainLayout />;

      default:
        return <Auth />;
    }
  }

  return <ThemeProvider theme={theme}>{routing()}</ThemeProvider>;
};

export default App;
