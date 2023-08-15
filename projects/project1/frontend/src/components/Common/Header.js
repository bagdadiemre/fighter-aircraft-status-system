import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authApi";
import {
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = ({ headerName, context }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Toolbar
      position="fixed"
      sx={{
        backgroundColor: "#006d77",
        borderRadius: "20px",
        color: "white",
        marginTop: "5px",
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {headerName}
      </Typography>
      {context?.role === "admin" && (
        <div>
          <Button color="inherit" component={Link} to="/messages">
            Messages
          </Button>
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
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
};

export default Header;
