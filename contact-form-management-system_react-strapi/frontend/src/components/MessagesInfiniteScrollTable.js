import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { getInfiniteScrollMessages } from "../services/messagesApi";
import { useTranslation } from "react-i18next";
import { ArrowForward } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const MessagesInfiniteScrollTable = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await getInfiniteScrollMessages(page, pageSize);
      const newMessages = response;
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has reached the bottom of the page, load more items
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              {t("MessagesInfiniteScroll.name")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "38%" }}>
              {t("MessagesInfiniteScroll.message")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "10%" }}>
              {t("MessagesInfiniteScroll.gender")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              {t("MessagesInfiniteScroll.country")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              {t("MessagesInfiniteScroll.creationDate")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "4%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.id}</TableCell>
              <TableCell>{message.attributes.name}</TableCell>
              <TableCell>
                <Tooltip title={message.message} arrow>
                  {message.attributes.message.length > 50
                    ? `${message.attributes.message.substring(0, 50)}...`
                    : message.attributes.message}
                </Tooltip>
              </TableCell>
              <TableCell>
                {t(`MessagesInfiniteScroll.${message.attributes.gender}`)}
              </TableCell>
              <TableCell>{message.attributes.country}</TableCell>
              <TableCell>{formatDate(message.attributes.createdAt)}</TableCell>
              <TableCell align="center" sx={{ width: "4%" }}>
                <IconButton
                  component={Link}
                  to={`/messages/${message.id}`}
                  size="small"
                >
                  <ArrowForward />
                </IconButton>
                {message.attributes.read === "true" ? (
                  <DoneIcon style={{ color: "green" }} />
                ) : (
                  <MailOutlineIcon style={{ color: "blue" }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "16px" }}
        >
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  );
};

export default MessagesInfiniteScrollTable;
