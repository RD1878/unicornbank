import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    textPrimary?: PaletteOptions["primary"];
  }
}

const WHITE = "#ffffff";
const DARK_PRIMARY = "#14213D";
const DARK_SECONDARY = "#2B3650";
const YELLOW_PRIMARY = "#FCA311";

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: DARK_PRIMARY },
    secondary: { main: YELLOW_PRIMARY },
    textPrimary: { main: "#ffffffEE" },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: "100%",
        borderRadius: 10,
        "& fieldset": {
          borderWidth: 2,
        },
        "&$focused $notchedOutline": {
          color: WHITE,
          borderColor: `${WHITE}`,
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
          borderColor: `${WHITE}`,
        },
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
        "&$focused": {
          color: `${WHITE}`,
        },
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: `${WHITE}`,
        },
        "&:not(.MuiInputLabel-shrink)": {
          left: 10,
          top: -2,
        },
      },
    },
  },
});

const light = createMuiTheme({
  palette: {
    type: "light",
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
      },
    },
  },
});

export const theme = {
  light,
  dark,
};

export default theme;
