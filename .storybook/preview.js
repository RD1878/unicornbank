import { ThemeProvider, useTheme } from "@material-ui/core";
import appThemes from "../src/theme/theme";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../src/store/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: ["dark", "light"],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = appThemes[context.globals.theme];
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Story {...context} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
export const decorators = [withThemeProvider];
