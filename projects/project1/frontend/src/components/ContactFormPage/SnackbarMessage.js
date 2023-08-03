import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarMessage = ({ error, successMessage, handleClose }) => {
  return (
    <Snackbar
      open={error !== "" || successMessage !== ""}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error !== "" ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {error !== "" ? error : successMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
