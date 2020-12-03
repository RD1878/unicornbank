import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme as appThemes } from "./theme";
import { Auth } from "./Pages";
import { MainLayout } from "./Pages/layouts/main";
// import { PrimaryButton } from "./atoms";

function App() {
  const [theme, setTheme] = useState<any>(appThemes.dark);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <MainLayout /> */}
        <Auth />
        {/* 
        <PrimaryButton onClick={() => setTheme(appThemes.dark)}>
          cvtybnm ntvf
        </PrimaryButton> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
