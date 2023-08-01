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

export const checkLogin = async (token) => {
  try {
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

export const logout = async (token) => {
  try {
    await axios.post(`${API_BASE_URL}/user/logout`, null, {
      headers: { token },
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/countries`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addNewMessage = async (name, message, gender, country) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/message/add`, {
      name,
      message,
      gender,
      country,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMessages = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMessageById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/message/${id}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const readMessageById = async (id, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/message/read/${id}`,
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

export const deleteMessageById = async (id, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/message/delete/${id}`,
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

export const addNewUserWithReaderRole = async (
  username,
  password,
  base64Photo,
  token
) => {
  try {
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

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserById = async (
  id,
  username,
  password,
  base64Photo,
  token
) => {
  try {
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
