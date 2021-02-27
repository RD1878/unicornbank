import React, { FC } from "react";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "../constants";
import { Snackbar } from "@material-ui/core";

interface IPrimaryAlert {
  open: boolean;
  onClose: () => void;
  alertMessage: string;
  alertType: "error" | "success";
}

const PrimaryAlert: FC<IPrimaryAlert> = ({
  open,
  onClose,
  alertMessage,
  alertType,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={SHACKBAR_SHOW_DURATION}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity={alertType} onClose={onClose}>
      {alertMessage}
    </Alert>
  </Snackbar>
);

export default PrimaryAlert;
