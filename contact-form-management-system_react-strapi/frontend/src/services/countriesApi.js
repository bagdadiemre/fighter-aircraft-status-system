import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/country`);
    console.log(response.data.data.attributes.countries.countries);
    return response.data.data.attributes.countries.countries;
  } catch (error) {
    throw error;
  }
};
