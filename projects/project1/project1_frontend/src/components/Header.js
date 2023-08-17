import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authApi";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
  ListItemText,
  Select,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next"; // Import the translation hook
import i18n from "../i18n/i18n"; // Import the i18next instance

const Header = ({ context, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the translation hook

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
    navigate("/login");
    logout();
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    toggleDarkMode();
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("Header.headerName")}
          </Typography>
          {context?.role === "admin" && (
            <div>
              <Button color="inherit" component={Link} to="/messages">
                {t("Header.messages")}
              </Button>
              <Button color="inherit" component={Link} to="/messagesPaginated">
                {t("Header.messagesPaginated")}
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/messagesInfiniteScroll"
              >
                IS
              </Button>
              <Button color="inherit" component={Link} to="/users">
                {t("Header.users")}
              </Button>
              <Button color="inherit" component={Link} to="/reports">
                {t("Header.reports")}
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
              <MenuItem onClick={handleDarkModeToggle}>
                <IconButton color="primary" onClick={handleDarkModeToggle}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {t("Header.darkMode")}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon /> {/* Add the Logout icon */}
                </IconButton>
                {t("Header.logout")}
              </MenuItem>
              <MenuItem>
                <ListItemText
                  primary={
                    <Select
                      value={i18n.language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      IconComponent={ArrowDropDownIcon}
                      disableUnderline
                      style={{ width: "150px", height: "40px" }} // Adjust the width as needed
                    >
                      <MenuItem value="en">
                        <ListItemText primary={t("Header.english")} />
                      </MenuItem>
                      <MenuItem value="tr">
                        <ListItemText primary={t("Header.turkish")} />
                      </MenuItem>
                    </Select>
                  }
                />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
