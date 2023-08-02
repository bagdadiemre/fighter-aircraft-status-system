import React, { createContext, useContext, useState } from 'react';
import { login, checkLogin } from './api'; // Import your API functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginHandler = async (username, password) => {
    try {
      const data = await login(username, password);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const checkLoginHandler = async (token) => {
    try {
      const data = await checkLogin(token);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logoutHandler = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    login: loginHandler,
    checkLogin: checkLoginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
