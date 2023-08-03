import React, { createContext, useContext, useReducer } from "react";
import { login, checkLogin, logout } from "./api"; // Import your API functions

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  role: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "CHECK_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginHandler = async (username, password) => {
    try {
      const data = await login(username, password);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data.data.user,
          token: data.data.token,
          role: data.data.user.role,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const checkLoginHandler = async (token) => {
    try {
      const data = await checkLogin(token);

      dispatch({
        type: "CHECK_LOGIN_SUCCESS",
        payload: {
          user: data.data.user,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      await logout(token);

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const contextValue = {
    user: state.user,
    login: loginHandler,
    checkLogin: checkLoginHandler,
    logout: logoutHandler,
    token: state.token,
    role: state.role,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
