// components/Auth/NotAuthorized.js
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const NotAuthorized = () => {
  return (
    <div>
      <Typography variant="h5">Not Authorized</Typography>
      <Typography>
        You do not have the required permissions to access this page.
      </Typography>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotAuthorized;
