import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../api/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate("/dashboard");
    } catch (error) {
      setError(error.error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
