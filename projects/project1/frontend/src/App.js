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
} from "./pages";

const App = () => {
  const [context, setContext] = useState();

  return (
    <AuthProvider value={{ context, setContext }}>
      <Routes>
        <Route path="/" element={<Navigate to="/contact" />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/*" element={<NotFoundPage />} />{" "}
      </Routes>
    </AuthProvider>
  );
};

export default App;
