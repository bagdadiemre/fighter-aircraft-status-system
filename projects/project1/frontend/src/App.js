import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import {
  NotFoundPage,
  ContactFormPage,
  LoginPage,
  MessagesPage,
  ReportsPage,
  UnauthorizedPage,
  UsersPage,
  MessagesDetailPage,
  UsersDetailPage,
  AddUserPage,
} from "./pages";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import Header from "./components/Common/Header"; // Update the import path

const App = () => {
  const [context, setContext] = useState();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider value={{ context, setContext }}>
        <Header
          headerName="Contact Form Management System"
          context={context}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/contact" />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/messages/:id" element={<MessagesDetailPage />} />
          <Route path="/users/:id" element={<UsersDetailPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/*" element={<NotFoundPage />} />{" "}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
