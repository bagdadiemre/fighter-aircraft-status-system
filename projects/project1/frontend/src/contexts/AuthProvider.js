import React, { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Check if user is already authenticated (e.g., using a stored token)
    // You can implement token validation here if needed
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // If there is a stored token, assume the user is authenticated
      setIsAuthenticated(true);
      // Fetch user data from the backend using the stored token
      api
        .get("/api/user/check-login")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          // Handle error if needed
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogin = useCallback(async (username, password) => {
    try {
      // Make a request to the backend endpoint to log in the user
      const response = await api.post("/api/user/login", {
        username,
        password,
      });

      // On successful login, update the isAuthenticated state and store user data
      setIsAuthenticated(true);
      setUser(response.data.user);
      setLoginError("");
      // Store the JWT token in localStorage for future authenticated requests
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      // On login error, set the loginError state to display the error message
      setIsAuthenticated(false);
      setUser(null);
      setLoginError("Invalid username or password.");
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      // Make a request to the backend endpoint to log out the user
      await api.post("/api/user/logout");

      // On successful logout, update the isAuthenticated state and clear user data
      setIsAuthenticated(false);
      setUser(null);
      // Remove the JWT token from localStorage
      localStorage.removeItem("token");
    } catch (error) {
      // Handle logout error if needed
    }
  }, []);

  return (
    // Provide the AuthContext to its children
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginError,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
