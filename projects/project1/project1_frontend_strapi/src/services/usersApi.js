import axios from "axios";

const API_BASE_URL = "http://localhost:5165/api";

export const addNewUserWithReaderRole = async (
  username,
  password,
  base64Photo
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/user/add-reader`,
      { username, password, base64Photo },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_BASE_URL}/user/${id}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserById = async (id, username, password, base64Photo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/user/update/${id}`,
      { username, password, base64Photo },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
