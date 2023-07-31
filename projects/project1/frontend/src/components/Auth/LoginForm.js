import React, { useState, useContext } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../../contexts/AuthContext";

const LoginForm = () => {
  const { handleLogin, loginError } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
            type="password"
            variant="outlined"
          />
        </Grid>
        {loginError && (
          <Grid item xs={12}>
            <Typography color="error">{loginError}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
