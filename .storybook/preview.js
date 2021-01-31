import { ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import appThemes from "../src/theme/theme";
import theme from "../src/theme/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => {
    /* const [theme, setTheme] = useState(appThemes.dark);
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]); */
    return (
      <ThemeProvider theme={theme.dark}>
        <Story />
      </ThemeProvider>
    );
  },
];
