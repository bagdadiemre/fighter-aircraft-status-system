// services/api.js
const BASE_URL = "http://localhost:5165/api";

// Function to fetch list of countries
export const getCountries = async () => {
  const response = await fetch(`${BASE_URL}/countries`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries.");
  }
  const data = await response.json();
  return data;
};

// Function to add a new message (contact form submission)
export const addMessage = async (formData) => {
  const response = await fetch(`${BASE_URL}/message/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to submit form.");
  }
  const data = await response.json();
  return data;
};

export const login = async (username, password) => {
  // Simulate a basic login functionality with predefined credentials
  const mockUser = {
    username: "testuser",
    password: "testpassword",
  };

  if (username === mockUser.username && password === mockUser.password) {
    // Return a mock JWT token as a successful response
    return "mock-jwt-token";
  } else {
    // Return a rejected promise as an unsuccessful response
    return Promise.reject(new Error("Invalid credentials."));
  }
};

// Export the functions
export default {
  getCountries,
  addMessage,
  login, // Include the login function in the export
};
