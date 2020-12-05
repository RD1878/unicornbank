import { createMuiTheme } from "@material-ui/core/styles";

const WHITE = "#ffffff";
const DARK_BLUE_1 = "rgba(20, 33, 61, 1)";
const DARK_BLUE_05 = "rgba(20, 33, 61, 0.5)";
const ORANGE = "#FCA311";

const light = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
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
      },
    },
  },
});

const dark = createMuiTheme({
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

export const COLORS = {
  ORANGE,
  DARK_BLUE_05,
  DARK_BLUE_1,
  WHITE,
};

const theme = {
  light,
  dark,
};

export default theme;
