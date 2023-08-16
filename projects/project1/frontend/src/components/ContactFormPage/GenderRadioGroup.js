import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

const GenderRadioGroup = ({ gender, handleGenderChange }) => {
  const { t } = useTranslation();
  return (
    <RadioGroup
      aria-label="gender"
      name="gender"
      value={gender}
      onChange={handleGenderChange}
      sx={{ flexDirection: "row", justifyContent: "space-around" }}
    >
      <FormControlLabel
        value="male"
        control={<Radio color="primary" />}
        label={t("ContactForm.male")}
      />
      <FormControlLabel
        value="female"
        control={<Radio color="primary" />}
        label={t("ContactForm.female")}
      />
    </RadioGroup>
  );
};

export default GenderRadioGroup;
