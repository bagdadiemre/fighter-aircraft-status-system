import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { NameField } from "../components/ContactFormPage";
import { MessageField } from "../components/ContactFormPage";
import { CountrySelect } from "../components/ContactFormPage";
import { GenderRadioGroup } from "../components/ContactFormPage";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert
import { addNewMessage } from "../services/messagesApi";
import { getCountries } from "../services/countriesApi";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data.countries);
    } catch (error) {
      setError("Failed to fetch countries.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setNameError(false);
    setMessageError(false);

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (!message) {
      setError("Message is required.");
      return;
    }

    if (!country) {
      setError("Country is required.");
      return;
    }

    if (!gender) {
      setError("Gender is required.");
      return;
    }

    if (name.length > MAX_NAME_CHARS) {
      setNameError(true);
      return;
    }

    if (message.length > MAX_MESSAGE_CHARS) {
      setMessageError(true);
      return;
    }

    try {
      await addNewMessage(name, message, gender, country);
      setName("");
      setMessage("");
      setGender("");
      setCountry("");
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName.slice(0, MAX_NAME_CHARS));
  };

  const handleMessageChange = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage.slice(0, MAX_MESSAGE_CHARS));
  };

  const handleCountryChange = (e, value) => {
    setCountry(value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const MAX_NAME_CHARS = 50;
  const MAX_MESSAGE_CHARS = 500;

  const handleSnackbarClose = () => {
    setError("");
    setSuccessMessage("");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" sx={{ mt: 7 }}>
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Contact Form
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  <NameField
                    name={name}
                    handleNameChange={handleNameChange}
                    nameError={nameError}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  <MessageField
                    message={message}
                    handleMessageChange={handleMessageChange}
                    messageError={messageError}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CountrySelect
                  countries={countries}
                  country={country}
                  handleCountryChange={handleCountryChange}
                />
              </Grid>
              <Grid item xs={12}>
                <GenderRadioGroup
                  gender={gender}
                  handleGenderChange={handleGenderChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          {error !== "" ||
          (successMessage !== "" && successMessage !== undefined) ? (
            <Snackbar
              open={
                error !== "" ||
                (successMessage !== "" && successMessage !== undefined)
              }
              autoHideDuration={4000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={error !== "" ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {error !== "" ? error : successMessage}
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default ContactForm;
