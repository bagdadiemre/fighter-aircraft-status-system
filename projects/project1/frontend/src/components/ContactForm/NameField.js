import React from "react";
import { TextField, Typography } from "@mui/material";

const MAX_NAME_CHARS = 50;

const NameField = ({ name, handleNameChange, nameError }) => {
  const getRemainingChars = (currentLength, maxLength) => {
    return `${currentLength}/${maxLength}`;
  };

  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        required
        fullWidth
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={nameError}
        inputProps={{ maxLength: MAX_NAME_CHARS }}
      />
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ textAlign: "right" }}
      >
        {getRemainingChars(name.length, MAX_NAME_CHARS)}
      </Typography>
    </React.Fragment>
  );
};

export default NameField;
