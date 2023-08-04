import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import UsersTable from "../components/UsersPage/UsersTable";
import { checkLogin } from "../services/authApi";
import { getUsers } from "../services/usersApi";

const UsersPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData.data.users);
    } catch (error) {
      console.error(error);
      navigate("/unauthorized");
    }
  };

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    handleCheckLogin();
    fetchUsers();
  }, [setContext]);

  return (
    <div>
      {/* Conditional checks for rendering components */}
      {context?.role === "reader" ? navigate("/unauthorized") : null}
      {context?.role !== "reader" && context?.role !== "admin"
        ? navigate("/login")
        : null}

      {context?.role === "admin" && (
        <div>
          <Header headerName={"Users Page"} context={context} />
          {/* Conditional check before rendering UsersTable */}
          <UsersTable users={users} />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
