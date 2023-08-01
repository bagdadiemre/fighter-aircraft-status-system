import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkLogin, logout } from "../api/api";

import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
      return;
    }

    checkLogin(token)
      .then((data) => setUser(data.data.user))
      .catch(() => history.push("/login"));
  }, [history]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logout(token);
      } catch (error) {
        console.log(error); // Handle logout error
      }
      localStorage.removeItem("token");
      history.push("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>{/* You can display an icon or user photo here */}</Avatar>
        <Typography component="h1" variant="h5">
          Welcome, {user ? user.username : "Guest"}!
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div>
        <Link to="/contact">Contact Us</Link>
      </div>
    </Container>
  );
};

export default DashboardPage;
