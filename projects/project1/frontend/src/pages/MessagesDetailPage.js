import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getMessageById,
  deleteMessageById,
  readMessageById,
} from "../services/messagesApi";
import { Button, Paper, Typography, Alert } from "@mui/material";
import Header from "../components/Common/Header";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await getMessageById(id);
        setMessage(response.data.message);

        if (context?.role === "admin" || context?.role === "reader") {
          await readMessageById(id);
        }
      } catch (error) {
        setError("Error fetching message details.");
      }
    };

    fetchMessageDetails();
  }, [id]);

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

  const handleDelete = async () => {
    try {
      await deleteMessageById(id);
      navigate("/messages");
    } catch (error) {
      setError("Error deleting message.");
    }
  };

  if (error) {
    return (
      <Alert severity="error" variant="outlined">
        {error}
      </Alert>
    );
  }

  if (!message) {
    // Implement loading state or redirect
    return null;
  }

  return (
    <>
      <Header headerName={"Messages Page"} context={context} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 300, width: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Message Details
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {message.name}
          </Typography>
          <Typography variant="body1">
            <strong>Message:</strong> {message.message}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {message.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Country:</strong> {message.country}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/messages"
            sx={{ mt: 3, mr: 12 }}
          >
            Homepage
          </Button>
          {context?.role === "admin" && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ mt: 3 }}
            >
              Delete
            </Button>
          )}
        </Paper>
      </div>
    </>
  );
};

export default MessageDetailsPage;
