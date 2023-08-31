import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const CountrySelect = ({ countries, country, handleCountryChange }) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      disablePortal
      options={countries}
      value={country}
      onChange={handleCountryChange}
      renderInput={(params) => <TextField {...params} label={t("ContactForm.country")} />}
    />
  );
};

export default CountrySelect;
