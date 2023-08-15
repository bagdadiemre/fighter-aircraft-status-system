import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authApi";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const Header = ({ headerName, context, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    toggleDarkMode(); // Call the function passed from the parent component
  };

  useEffect(() => {
    // No need for document.body.setAttribute("data-theme", theme) anymore
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <Toolbar sx={{ backgroundColor: "#006d77", borderRadius: "10px" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerName}
          </Typography>
          {context?.role === "admin" && (
            <div>
              {headerName !== "Messages Page" && (
                <Button color="inherit" component={Link} to="/messages">
                  Messages
                </Button>
              )}
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/reports">
                Reports
              </Button>
            </div>
          )}
          <div>
            <Button
              color="inherit"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar src={context?.base64Photo} alt={context?.username} />
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{context?.username}</MenuItem>
              <MenuItem>
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  color="primary"
                />
                Dark Mode
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
