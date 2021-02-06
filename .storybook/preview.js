import { ThemeProvider, useTheme } from "@material-ui/core";
import { StoryContext, StoryGetter, StoryWrapper } from "@storybook/addons";
import { useState } from "react";
import appThemes from "../src/theme/theme";
import theme from "../src/theme/theme";

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
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "ru",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ru", title: "RU" },
        { value: "en", title: "EN" },
        { value: "tat", title: "TAT" },
      ],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = appThemes[context.globals.theme];
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};
export const decorators = [withThemeProvider];
