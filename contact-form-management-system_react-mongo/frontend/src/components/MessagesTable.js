import React, { useEffect, useState } from "react";
import { getMessages } from "../services/messagesApi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import MailOutlineIcon  from "@mui/icons-material/MailOutline";

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
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

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 5, userSelect: "none", mb: 5, borderRadius: "10px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "16px", width: "2%" }}>ID</TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              {t("MessagesPage.name")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "38%" }}>
              {t("MessagesPage.message")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "10%" }}>
              {t("MessagesPage.gender")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              {t("MessagesPage.country")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              {t("MessagesPage.creationDate")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "4%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
            >
              <TableCell>{message.id}</TableCell>
              <TableCell>{message.name}</TableCell>
              <TableCell>
                <Tooltip title={message.message} arrow>
                  {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
                </Tooltip>
              </TableCell>
              <TableCell>{t(`MessagesPage.${message.gender}`)}</TableCell>
              <TableCell>{message.country}</TableCell>
              <TableCell>{formatDate(message.creationDate)}</TableCell>
              <TableCell align="center" sx={{ width: "4%" }}>
                <IconButton
                  component={Link}
                  to={`/messages/${message.id}`}
                  size="small"
                >
                  <ArrowForward />
                </IconButton>
                {message.read === "true" ? (
              <DoneIcon style={{ color: "green" }} />
            ) : (
              <MailOutlineIcon style={{ color: "blue" }} />
            )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessagesTable;
