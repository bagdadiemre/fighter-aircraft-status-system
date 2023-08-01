import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CountrySelect = ({ countries, country, handleCountryChange }) => {
  return (
    <Autocomplete
      disablePortal
      options={countries}
      value={country}
      onChange={handleCountryChange}
      renderInput={(params) => <TextField {...params} label="Country *" />}
    />
  );
};

export default CountrySelect;
