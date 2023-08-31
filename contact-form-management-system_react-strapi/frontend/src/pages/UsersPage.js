import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UsersTable } from "../components";
import { checkLogin } from "../services/authApi";
import { getUsers } from "../services/usersApi";

const UsersPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
      navigate("/unauthorized");
    }
  };

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleCheckLogin();
    fetchUsers();
  }, []);

  return (
    <div>
      {context?.roleType === "reader" ? navigate("/unauthorized") : null}
      {context?.roleType !== "reader" && context?.roleType !== "admin"
        ? navigate("/login")
        : null}

      {context?.roleType === "admin" && (
        <div>
          {/* Conditional check before rendering UsersTable */}
          <UsersTable users={users} />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
