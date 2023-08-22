import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/local`, {
      identifier: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const checkLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    throw error;
  }
};
