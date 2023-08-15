import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // Import your themes

const AppThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    console.log("denemeee");
  };

  useEffect(() => {
    // No need for document.body.setAttribute("data-theme", theme) anymore
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {React.cloneElement(children, { darkMode, handleDarkModeToggle })}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
