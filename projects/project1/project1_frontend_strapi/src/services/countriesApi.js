import axios from "axios";

const API_BASE_URL = "http://localhost:5165/api";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/countries`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
