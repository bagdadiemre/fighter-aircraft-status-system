import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactFormPage from "./pages/ContactFormPage";
import MessagesPage from "./pages/MessagesPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/contact" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        {isLoggedIn && (
          <>
            <Route path="/messages" element={<MessagesPage />} />
            <Route
              path="/users"
              element={
                userRole === "admin" ? (
                  <UsersPage />
                ) : (
                  <Navigate to="/unauthorized" replace />
                )
              }
            />
            <Route
              path="/reports"
              element={
                userRole === "admin" ? (
                  <ReportsPage />
                ) : (
                  <Navigate to="/unauthorized" replace />
                )
              }
            />
          </>
        )}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
