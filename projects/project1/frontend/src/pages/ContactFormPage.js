import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Paper,
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
  const [countryError, setCountryError] = useState(false);
  const [genderError, setGenderError] = useState(false);

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
      setNameError(true);
      return;
    }

    if (!message) {
      setError("Message is required.");
      setMessageError(true);
      return;
    }

    if (!country) {
      setError("Country is required.");
      setCountryError(true);
      return;
    }

    if (!gender) {
      setError("Gender is required.");
      setGenderError(true);
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
    setNameError(false); // Clear the name error when the user starts typing
  };

  const handleMessageChange = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage.slice(0, MAX_MESSAGE_CHARS));
    setMessageError(false); // Clear the message error when the user starts typing
  };

  const handleCountryChange = (e, value) => {
    setCountry(value);
    setCountryError(false);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderError(false);
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
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 15,
          }}
        >
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
                    alignItems="flex-start"
                  >
                    {nameError && (
                      <Typography color="error" variant="caption">
                        Name is required.
                      </Typography>
                    )}
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
                    alignItems="flex-start"
                  >
                    {messageError && (
                      <Typography color="error" variant="caption">
                        Message is required.
                      </Typography>
                    )}
                    <MessageField
                      message={message}
                      handleMessageChange={handleMessageChange}
                      messageError={messageError}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  {countryError && (
                    <Typography color="error" variant="caption">
                      Country is required.
                    </Typography>
                  )}
                  <CountrySelect
                    countries={countries}
                    country={country}
                    handleCountryChange={handleCountryChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {genderError && (
                    <Typography color="error" variant="caption">
                      Gender is required.
                    </Typography>
                  )}
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
        </Paper>
      </Container>
    </div>
  );
};

export default ContactForm;
