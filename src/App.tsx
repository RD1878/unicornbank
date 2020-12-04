import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme as appThemes } from "./theme";
import { Auth } from "./Pages";

const App: FC = () => {
  const [theme] = useState(appThemes.light);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Auth />
      </div>
    </ThemeProvider>
  );
};

export default App;
