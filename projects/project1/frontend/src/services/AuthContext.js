import React, { createContext, useContext, useState } from "react";
import { login, checkLogin, logout } from "./api"; // Import your API functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const loginHandler = async (username, password) => {
    try {
      const data = await login(username, password);
      console.log("loginHandler:", data);
      console.log("setUser:", data.data.user);
      console.log("setToken:", data.data.token);
      console.log("setRole:", data.data.user.role);

      setUser(data.data.user);
      setToken(data.data.token);
      setRole(data.data.user.role);

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.user.role);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const checkLoginHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await checkLogin(token);
      setUser(data.data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      await logout(token);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const contextValue = {
    user,
    login: loginHandler,
    checkLogin: checkLoginHandler,
    logout: logoutHandler,
    token,
    role,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
