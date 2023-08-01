import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkLogin, logout } from "../api/api";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
      return;
    }

    checkLogin(token)
      .then((data) => setUser(data.data.user))
      .catch(() => history.push("/login"));
  }, [history]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logout(token);
      } catch (error) {
        console.log(error); // Handle logout error
      }
      localStorage.removeItem("token");
      history.push("/login");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
