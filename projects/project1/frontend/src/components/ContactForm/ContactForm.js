// components/ContactForm/ContactForm.js
import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../contexts/AuthContext";
import { getCountries, addMessage } from "../../services/api";

const ContactForm = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch list of countries when the component mounts
    getCountries()
      .then((data) => {
        setCountryList(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setErrorMessage("Failed to fetch countries.");
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Form validation and submission logic here
    const formData = {
      name,
      message,
      gender,
      country: selectedCountry,
    };
    // Submit the form data to the backend
    addMessage(formData)
      .then((response) => {
        // Handle success, display success message, etc.
        console.log("Form submission successful:", response);
        setSuccessMessage("Form submission successful!");
        // Clear form fields
        setName("");
        setMessage("");
        setGender("");
        setSelectedCountry("");
      })
      .catch((error) => {
        // Handle error, display error message, etc.
        console.error("Error submitting form:", error);
        setErrorMessage("Failed to submit form.");
      });
  };

  if (!isAuthenticated) {
    return <div>Please log in to access the contact form.</div>;
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <br />
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            {countryList.map((country) => (
              <MenuItem key={country.code} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {/* Snackbar for success message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default ContactForm;
