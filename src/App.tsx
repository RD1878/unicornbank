import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme as appThemes } from "./theme";
import { Auth } from "./Pages";
import { MainLayout } from "./Pages/layouts/main";
// import { PrimaryButton } from "./atoms";

const App: FC = () => {
  const [theme] = useState(appThemes.dark);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <MainLayout /> */}
        <Auth />
      </div>
    </ThemeProvider>
  );
};

export default App;
