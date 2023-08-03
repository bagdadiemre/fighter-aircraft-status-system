import React from "react";
import { useAuth } from "../services/AuthContext";

const MessagesPage = () => {
  const { user, role } = useAuth();

  return (
    <div>
      <h2>Messages Page</h2>
      {role === "admin" && (
        <div>
          {/* Display content for admin */}
          <p>Admin content: Link to Page A</p>
          <p>Admin content: Link to Page B</p>
        </div>
      )}
      {role === "reader" && (
        <div>
          {/* Display content for reader */}
          <p>Reader content: Link to Page A</p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
