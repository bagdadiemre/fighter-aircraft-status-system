import React, { useContext, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const MessagesPage = () => {
  const {
    context: { user },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div>
      <h2>Messages Page</h2>
      {user?.role === "admin" && (
        <div>
          {/* Display content for admin */}
          <p>Admin content: Link to Page A</p>
          <p>Admin content: Link to Page B</p>
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
