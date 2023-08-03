import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./services/AuthProvider";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import ContactFormPage from "./pages/ContactFormPage";
import UsersPage from "./pages/UsersPage";
import Unauthorized from "./pages/UnauthorizedPage";

const App = () => {
  const [context, setContext] = useState({});

  return (
    <AuthProvider value={{ context, setContext }}>
      <Routes>
        <Route path="/" element={<Navigate to="/contact" />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />{" "}
      </Routes>
    </AuthProvider>
  );
};

export default App;
