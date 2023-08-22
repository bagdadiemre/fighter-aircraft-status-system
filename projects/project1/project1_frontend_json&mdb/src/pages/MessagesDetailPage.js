import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await getMessageById(id);
        setMessage(response.data.message);

        if (context?.role === "admin" || context?.role === "reader") {
          await readMessageById(id);
        }
      } catch (error) {
        const errorMsg = t("MessagesDetailPage.messageDetails");
        setError(errorMsg);
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat(t("lng"), options).format(
      new Date(dateString)
    );
  };

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
      const errorMsg = t("MessagesDetailPage.deleteMessageError");
      setError(errorMsg);
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
            maxWidth: 500,
            width: "100%",
            margin: "auto", // Center the card
            borderRadius: 8, // Rounded corners
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            border: "2px solid #83c5be", // Border with specified color
          }}
        >
          <Typography variant="h5" gutterBottom style={{ fontSize: "1.7rem" }}>
            {t("MessagesDetailPage.messageDetails")}
          </Typography>
          <div
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
            }}
          ></div>
          <Typography variant="body1" sx={{ margin: "8px 0" }}>
            <strong>{t("MessagesDetailPage.name")}:</strong> {message.name}
          </Typography>
          <Typography variant="body1" sx={{ margin: "8px 0" }}>
            <strong>{t("MessagesDetailPage.message")}:</strong>{" "}
            {message.message}
          </Typography>
          <Typography variant="body1" sx={{ margin: "8px 0" }}>
            <strong>{t("MessagesDetailPage.gender")}:</strong>{" "}
            {t(`MessagesDetailPage.${message.gender}`)}
          </Typography>
          <Typography variant="body1" sx={{ margin: "8px 0" }}>
            <strong>{t("MessagesDetailPage.country")}:</strong>{" "}
            {message.country}
          </Typography>
          <Typography variant="body1" sx={{ margin: "8px 0" }}>
            <strong>{t("MessagesDetailPage.creationDate")}:</strong>{" "}
            {formatDate(message.creationDate)}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/messages"
            sx={{
              mt: 3,
              mr: 2,
            }}
          >
            {t("MessagesDetailPage.homepage")}
          </Button>

          {context?.role === "admin" && (
            <>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteConfirmation}
                sx={{ mt: 3 }}
              >
                {t("MessagesDetailPage.delete")}
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
                <DialogTitle>
                  {t("MessagesDetailPage.confirmDeletion")}
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1">
                    <strong>{t("MessagesDetailPage.name")}:</strong>{" "}
                    {message.name}
                  </Typography>
                  <Typography variant="body1" s>
                    <strong>{t("MessagesDetailPage.message")}:</strong>{" "}
                    {message.message}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleConfirmedDelete}>
                    {t("MessagesDetailPage.delete")}
                  </Button>
                  <Button onClick={handleCancelDelete}>
                    {t("MessagesDetailPage.cancel")}
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
