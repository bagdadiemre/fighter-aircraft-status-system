import React from "react";
import { TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import the translation hook

const MAX_MESSAGE_CHARS = 500;

const MessageField = ({ message, handleMessageChange, messageError }) => {
  const getRemainingChars = (currentLength, maxLength) => {
    return `${currentLength}/${maxLength}`;
  };
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        fullWidth
        label={t("ContactForm.message")}
        multiline
        rows={9}
        value={message}
        onChange={handleMessageChange}
        error={messageError}
        inputProps={{ maxLength: MAX_MESSAGE_CHARS }}
      />
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ textAlign: "right" }}
      >
        {getRemainingChars(message.length, MAX_MESSAGE_CHARS)}
      </Typography>
    </React.Fragment>
  );
};

export default MessageField;
