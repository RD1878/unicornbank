import React, { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme";
import Auth from "./Pages/Auth";

const App: FC = () => {
  const [theme] = useState(appThemes.dark);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Auth />
      </div>
    </ThemeProvider>
  );
};

export default App;
