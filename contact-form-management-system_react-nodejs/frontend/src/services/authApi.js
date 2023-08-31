import axios from "axios";

const API_BASE_URL = "http://localhost:5165/api";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/user/check-login`,
      null,
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${API_BASE_URL}/user/logout`, null, {
      headers: { token },
    });
    localStorage.removeItem("token");
  } catch (error) {
    throw error.response.data;
  }
};
