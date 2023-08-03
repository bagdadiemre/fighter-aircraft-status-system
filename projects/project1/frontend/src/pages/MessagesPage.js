import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const MessagesPage = () => {
  const {
    context: { user },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Messages Page</h2>
      {user?.role === "admin" && (
        <div>
          {/* Display content for admin */}
          <p>
            <Link to="/users">Users</Link>
          </p>
          <Link to="/reports">reports</Link>
        </div>
      )}
      {user?.role === "reader" && (
        <div>
          {/* Display content for reader */}
          <p>Reader content: Link to Page A</p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
