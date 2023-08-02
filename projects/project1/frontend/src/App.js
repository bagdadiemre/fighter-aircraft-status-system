import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage"; // Import the new component

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messages" element={<MessagesPage />} />{" "}
          {/* New route */}
          {/* Add more routes as needed */}
        </Routes>
    </AuthProvider>
  );
};

export default App;
