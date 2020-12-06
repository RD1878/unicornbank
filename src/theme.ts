import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    textPrimary?: PaletteOptions["primary"];
    textSecondary?: PaletteOptions["primary"];
  }
}

const WHITE = "#ffffff";
const DARK_PRIMARY0 = "#2B3650";
const DARK_PRIMARY1 = "#14213D";
const DARK_PRIMARY2 = "#0C121F";
const LIGHT_PRIMARY0 = "#F5F5F5";
const LIGHT_PRIMARY1 = "#F8F3FE";
// const LIGHT_PRIMARY2 = "#F8F3FE";
const LIGHT_PRIMARY2 = "#F2E9E4";
const WHITE_OPACITY = "#FFFFFF70";
const YELLOW_PRIMARY = "#FCA311";

const overrides = {
  MuiTypography: {
    root: {
      fontFamily: "Segoe UI, sans-serif !important",
      letterSpacing: 0.25,
    },
    h1: {
      fontSize: 32,
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
    },
  },
  MuiOutlinedInput: {
    root: {
      borderRadius: 10,
      "& fieldset": {
        borderWidth: 2,
      },
    },
    input: {
      padding: "15.5px 14px",
    },
  },
  MuiTextField: {
    root: {
      "& .Mui-focused": {
        color: WHITE,

        "& fieldset": {
          borderColor: `${WHITE} !important`,
        },
      },
    },
  },
  MuiFormControl: {
    root: {
      "& .Mui-focused": {
        color: `${WHITE} !important`,

        "& fieldset": {
          borderColor: `${WHITE} !important`,
        },
      },
      "& label:not(.MuiInputLabel-shrink)": {
        left: 10,
        top: -2,
      },
    },
  },
};

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: DARK_PRIMARY0,
      main: DARK_PRIMARY1,
      dark: DARK_PRIMARY2,
    },
    secondary: { main: YELLOW_PRIMARY },
    textPrimary: { main: "#ffffffEE" },
    textSecondary: { main: "#ffffff46" },
  },
  overrides,
});

const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: LIGHT_PRIMARY0,
      main: LIGHT_PRIMARY1,
      dark: LIGHT_PRIMARY2,
    },
    secondary: { main: DARK_PRIMARY1 },
    textPrimary: { main: DARK_PRIMARY1 },
  },
  overrides,
});

export const theme = {
  light,
  dark,
};
