import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkLogin, logout } from "../services/authApi";
import MessagesTable from "../components/MessagesPage/MessagesTable";
import Header from "../components/Common/Header";
import { Container } from "@mui/material";

const MessagesPage = () => {
  const navigate = useNavigate();
  const { context, setContext } = useContext(AuthContext);
  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error("Check Login failed:", error);
        console.log(context);
        navigate("/unauthorized");
      }
    };

    handleCheckLogin();
  }, []);

  return (
    <div>
      <Header headerName={"Messages Page"} context={context} />
      <Container>
        <MessagesTable />
      </Container>
    </div>
  );
};

export default MessagesPage;
