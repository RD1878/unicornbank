import { createMuiTheme } from "@material-ui/core/styles";

const WHITE = "#ffffff";

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

export const theme = {
  light,
  dark,
};
