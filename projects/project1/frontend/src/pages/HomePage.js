import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin } from "../services/api";
import { useAuth } from "../services/AuthContext";
import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, updateUser, handleLogout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    checkLogin(token)
      .then((data) => {
        updateUser(data.data.user); // Update user state
      })
      .catch(() => {
        handleLogout();
        navigate("/login");
      });
  }, [isLoggedIn, navigate, updateUser, handleLogout]);

  const isAdmin = user?.role === "admin";
  const isReader = user?.role === "reader";

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
      {isAdmin && (
        <div>
          <Link to="/messages">Messages</Link>
          <Link to="/users">Users</Link>
          <Link to="/reports">Reports</Link>
        </div>
      )}
      {isReader && (
        <div>
          <Link to="/messages">Messages</Link>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
