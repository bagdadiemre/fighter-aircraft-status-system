import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

export const addNewUserWithReaderRole = async (
  username,
  password,
  base64Photo
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/users`,
      {
        username: username,
        password: password,
        base64Photo: base64Photo,
        roleType: "reader",
        email: "dummy@dummy.com",
        role: 3,
        confirmed: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserById = async (id, username, password, base64Photo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/users/${id}`,
      {
        username: username,
        password: password,
        base64Photo: base64Photo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
