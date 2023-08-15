import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getMessageById,
  deleteMessageById,
  readMessageById,
} from "../services/messagesApi";
import {
  Button,
  Paper,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Header from "../components/Common/Header";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmedDelete = async () => {
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
    return null;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            maxWidth: 300,
            width: "100%",
            margin: "auto", // Center the card
            backgroundColor: "#fbfdfd ", // Light gray background
            borderRadius: 8, // Rounded corners
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            border: "2px solid #83c5be", // Border with specified color
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "#333", fontSize: "1.7rem" }}
          >
            Message Details
          </Typography>
          <div
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
            }}
          ></div>
          <Typography
            variant="body1"
            sx={{ margin: "8px 0" }}
            style={{ color: "#555" }}
          >
            <strong>Name:</strong> {message.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "8px 0" }}
            style={{ color: "#555" }}
          >
            <strong>Message:</strong> {message.message}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "8px 0" }}
            style={{ color: "#555" }}
          >
            <strong>Gender:</strong> {message.gender}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "8px 0" }}
            style={{ color: "#555" }}
          >
            <strong>Country:</strong> {message.country}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/messages"
            sx={{
              mt: 3,
              mr: 2,
              color: "#006d77",
              borderColor: "#006d77",
              "&:hover": {
                borderColor: "#006d77", // Set hover border color
              },
            }} // Added color and borderColor
          >
            Homepage
          </Button>

          {context?.role === "admin" && (
            <>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteConfirmation}
                sx={{ mt: 3 }}
              >
                Delete
              </Button>
              <Dialog
                open={showDeleteConfirmation}
                onClose={handleCancelDelete}
                maxWidth="sm"
                PaperProps={{
                  style: {
                    borderRadius: "8px", // Adjust the border radius as needed
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                  },
                }}
              >
                <DialogTitle style={{ color: "#006d77" }}>
                  Confirm Deletion
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1" style={{ color: "#333" }}>
                    <strong>Name:</strong> {message.name}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#333" }}>
                    <strong>Message:</strong> {message.message}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleConfirmedDelete}
                    style={{ color: "#FF5722" }}
                  >
                    Confirm Delete
                  </Button>
                  <Button
                    onClick={handleCancelDelete}
                    style={{ color: "#006d77" }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Paper>
      </div>
    </>
  );
};

export default MessageDetailsPage;
