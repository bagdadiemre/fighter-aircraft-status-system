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
  MessagesPaginatedPage,
  MessagesInfiniteScrollPage,
} from "./pages";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Header from "./components/Header";

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
        {/* context is the value of the context provider, setContext is the function to update the context */}
        <Routes>
          <Route path="/" element={<Navigate to="/contact" />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/messages"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <MessagesPage />
              </>
            }
          />
          <Route
            path="/messagesPaginated"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <MessagesPaginatedPage />
              </>
            }
          />
          <Route
            path="/messagesInfiniteScroll"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <MessagesInfiniteScrollPage />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <UsersPage />
              </>
            }
          />
          <Route
            path="/reports"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <ReportsPage />
              </>
            }
          />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/messages/:id"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <MessagesDetailPage />
              </>
            }
          />
          <Route
            path="/users/:id"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <UsersDetailPage />
              </>
            }
          />
          <Route
            path="/add-user"
            element={
              <>
                {" "}
                <Header
                  headerName="Contact Form Management System"
                  context={context}
                  toggleDarkMode={toggleDarkMode}
                />
                <AddUserPage />
              </>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />{" "}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
