import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import UsersTable from "../components/UsersPage/UsersTable";
import UsersAddForm from "../components/UsersPage/UserAddForm";
import { checkLogin } from "../services/authApi";
import { getUsers, addNewUserWithReaderRole } from "../services/usersApi";
import { Grid, Paper } from "@mui/material"; // Import Slide and Paper from MUI

const UsersPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addNewUserWithReaderRole(username, password);
      fetchUsers();
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
  };

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

          <Grid container spacing={2}>
            <Grid item xs={showAddForm ? 8 : 12}>
              {/* Conditional check before rendering UsersTable */}
              {users.length > 0 && (
                <UsersTable
                  users={users}
                  showAddForm={showAddForm}
                  handleAddButtonClick={handleAddButtonClick}
                />
              )}
            </Grid>

            {showAddForm && (
              <Grid
                item
                xs={
                  (showAddForm ? 4 : 0,
                  { display: "flex", justifyContent: "center", mt: 10 })
                }
              >
                {showAddForm && (
                  <UsersAddForm
                    handleAddUser={handleAddUser}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    show={showAddForm}
                  />
                )}
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
