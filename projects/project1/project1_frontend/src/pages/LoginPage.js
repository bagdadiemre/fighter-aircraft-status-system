import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "../services/authApi";
import { useTranslation } from "react-i18next"; // Import the translation hook

const LoginPage = () => {
  const { setContext } = useContext(AuthContext);
  const { t } = useTranslation(); // Initialize the translation hook
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        const errorStr = t("Login.usernameAndPasswordAreRequired");
        setError(errorStr);
        setOpenSnackbar(true);
        return;
      }

      const data = await login(username, password);

      console.log("Login successful:", data);
      localStorage.setItem("token", data.data.token);
      setContext(data.data.user);

      navigate("/messages"); // Redirect to MessagesPage
    } catch (error) {
      const errorStr = t("Login.invalidCredentials");
      setError(errorStr);
      setOpenSnackbar(true);
      console.error("Login failed:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 20,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("Login.login")}
        </Typography>
        <TextField
          label={t("Login.username")}
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label={t("Login.password")}
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 3 }}
        >
          {t("Login.login")}
        </Button>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
