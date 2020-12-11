import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import Auth from "./Pages/Auth";
import Register from "./Pages/Register";

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
