import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin, logout, login } from "./api";

export const handleLogin = async (username, password) => {
  try {
    const { data } = await login(username, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    return true;
  } catch (error) {
    throw error.error;  
  }
};


