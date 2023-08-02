import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const GenderRadioGroup = ({ gender, handleGenderChange }) => {
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
        label="Male"
      />
      <FormControlLabel
        value="female"
        control={<Radio color="primary" />}
        label="Female"
      />
    </RadioGroup>
  );
};

export default GenderRadioGroup;
