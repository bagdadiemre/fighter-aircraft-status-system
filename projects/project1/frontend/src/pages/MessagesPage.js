import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin, logout } from "../services/authApi";

const MessagesPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error("Check Login failed:", error);
        console.log(context)
        navigate("/unauthorized");
      }
    };

    handleCheckLogin();
  }, []);

  return (
    <div>
      <h2>Messages Page</h2>
      {context?.role === "admin" && (
        <div>
          <p>
            <Link to="/users">Users</Link>
          </p>
          <p>
            <Link to="/reports">reports</Link>
          </p>
          <p>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </p>
        </div>
      )}
      {context?.role === "reader" && (
        <div>
          <p>Reader content: Link to Page A</p>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
