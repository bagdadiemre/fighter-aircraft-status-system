import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage"; // Import your admin and reader pages
import ReaderPage from "./pages/ReaderPage";

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reader" element={<ReaderPage />} />
          {/* Add more routes as needed */}
        </Routes>
    </AuthProvider>
  );
};

export default App;
