import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/authApi";
import { MessagesTable } from "../components";
import { Container } from "@mui/material";

const MessagesPage = () => {
  const navigate = useNavigate();
  const { context, setContext } = useContext(AuthContext);
  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data);
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
      <Container>
        <MessagesTable />
      </Container>
    </div>
  );
};

export default MessagesPage;
