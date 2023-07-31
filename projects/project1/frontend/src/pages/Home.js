// pages/Home.js
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "../components/Auth/LoginForm";
import LogoutButton from "../components/Auth/LogoutButton";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <LogoutButton />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;
