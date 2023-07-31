// components/Auth/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div>
      <Typography variant="h5">Not Found</Typography>
      <Typography>The page you are looking for does not exist.</Typography>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotFound;
