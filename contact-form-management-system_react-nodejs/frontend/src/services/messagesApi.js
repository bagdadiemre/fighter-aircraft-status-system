import axios from "axios";

const API_BASE_URL = "http://localhost:5165/api";

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

export const getMessages = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/messages`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPaginatedMessages = async (
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/messagesPagination`, {
      params: {
        page: page + 1,
        perPage: rowsPerPage,
        sortBy,
        sortOrder,
      },
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getInfiniteScrollMessages = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/messagesInfiniteScroll`, {
      headers: { token },
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/message/${id}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const readMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
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

export const deleteMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
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
