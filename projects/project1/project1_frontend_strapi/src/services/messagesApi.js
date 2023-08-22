import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

export const addNewMessage = async (name, message, gender, country) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages`, {
      data: {
        name: name,
        message: message,
        gender: gender,
        country: country,
        read: false,
      },
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

//TODO - Implement getPaginatedMessages
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

//TODO - Implement getInfiniteScrollMessages
export const getInfiniteScrollMessages = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/messagesInfiniteScroll`, {
      headers: { token },
      params: { page },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const readMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/messages/${id}`,
      {
        data: {
          read: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteMessageById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
