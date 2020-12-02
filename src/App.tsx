import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import { theme as appThemes } from "./theme";
import { Auth } from "./Pages";
// import { PrimaryButton } from "./atoms";

function App() {
  const [theme, setTheme] = useState<any>(appThemes.light);

  return (
    <ThemeProvider theme={theme}>
      <div>
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
