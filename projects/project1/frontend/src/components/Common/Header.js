// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ role }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {role === "admin" && (
          <>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
          </>
        )}
        {role === "reader" && (
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
