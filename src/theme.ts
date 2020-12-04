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
        borderRadius: 10,
        "& fieldset": {
          borderWidth: 2,
        },
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
        width: "100%",
        "& .Mui-focused": {
          color: `${WHITE} !important`,

          "& fieldset": {
            borderColor: `${WHITE} !important`,
          },
        },
        "& label": { left: 10 },
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
