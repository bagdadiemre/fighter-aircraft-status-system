import React, { useState, useEffect } from "react";
import { checkLogin } from "./services/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  HomePage,
  ContactFormPage,
  MessagesPage,
  UsersPage,
  ReportsPage,
  UnauthorizedPage,
  NotFoundPage,
} from "./pages";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkLogin(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserRole(data.data.user.role);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserRole(null);
        });
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/contact" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        {isLoggedIn && (
          <>
            <Route path="/homepage" element={<HomePage />} />
            <Route
              path="/login"
              element={<Navigate to="/homepage" replace />}
            />
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
        {!isLoggedIn && (
          <>
            <Route
              path="/homepage"
              element={<Navigate to="/unauthorized" replace />}
            />
            <Route
              path="/messages"
              element={<Navigate to="/unauthorized" replace />}
            />
            <Route
              path="/users"
              element={<Navigate to="/unauthorized" replace />}
            />
            <Route
              path="/reports"
              element={<Navigate to="/unauthorized" replace />}
            />
          </>
        )}

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
