import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PaletteOptions {
    textPrimary?: PaletteOptions["primary"];
    textSecondary?: PaletteOptions["primary"];
    active?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    initial?: PaletteOptions["primary"];
  }
}

const BLUE300 = "#2B3650";
const BLUE500 = "#14213D";
const BLUE800 = "#0C121F";
const WHITE50 = "#F8F3FE";
const WHITE100 = "#F2E9E4";
const WHITE200 = "#F5F5F5";
const YELLOW500 = "#FCA311";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const overrides = {
  MuiTypography: {
    root: {
      fontFamily: "Segoe UI, sans-serif !important",
      letterSpacing: 0.25,
    },
    h1: {
      fontSize: 32,
      "@media (max-width: 600px)": {
        fontSize: 20,
      },
      fontWeight: 500,
      marginBottom: "0.5rem",
      textShadow: `1px 1px 2px ${BLUE800}BB`,
    },
    h2: {
      fontSize: 22,
      "@media (max-width: 600px)": {
        fontSize: 16,
      },
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
      "@media (max-width: 600px)": {
        fontSize: 12,
      },
    },
    body2: {
      fontSize: 20,
      "@media (max-width: 600px)": {
        fontSize: 14,
      },
    },
    button: {
      fontSize: 12,
      letterSpacing: 1.25,
      fontWeight: 600,
    },
    button2: {
      fontSize: 10,
      fontWeight: 600,
    },
  },
  MuiOutlinedInput: {
    root: {
      width: "100%",
      borderRadius: 10,
      "&$focused $notchedOutline": {
        color: WHITE50,
        borderColor: WHITE50,
      },
    },
    input: {
      padding: "15.5px 14px",
    },
    notchedOutline: {
      borderWidth: 2,
    },
  },
  MuiFormLabel: {
    root: {
      "&$focused": {
        color: WHITE50,
      },
    },
  },
  MuiInputLabel: {
    outlined: {
      transform: "translate(18px, 18px)",
    },
  },
};

const dark = createMuiTheme({
  breakpoints,
  palette: {
    type: "dark",
    primary: {
      light: BLUE300,
      main: BLUE500,
      dark: BLUE800,
    },
    secondary: { main: YELLOW500 },
    textPrimary: { main: WHITE50 },
    textSecondary: { main: `${WHITE50}50` },
    initial: { main: WHITE50 },
    active: { main: YELLOW500 },
    white: { main: WHITE50 },
  },
  overrides,
});

const light = createMuiTheme({
  breakpoints,
  palette: {
    type: "light",
    primary: {
      light: WHITE200,
      main: WHITE50,
      dark: WHITE100,
    },
    secondary: { main: BLUE500 },
    textPrimary: { main: BLUE500 },
    textSecondary: { main: `${WHITE50}50` },
    initial: { main: WHITE50 },
    active: { main: YELLOW500 },
    white: { main: WHITE50 },
  },
  overrides,
});

export const theme = {
  light,
  dark,
};

export default theme;
