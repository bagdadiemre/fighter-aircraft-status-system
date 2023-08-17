import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPaginatedMessages } from "../services/messagesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import DoneIcon from "@mui/icons-material/Done";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const MessagePaginatedTable = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("creationDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMessages();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const fetchMessages = async () => {
    try {
      const messagesData = await getPaginatedMessages(
        page,
        rowsPerPage,
        sortBy,
        sortOrder
      );
      setMessages(messagesData.data.messages);
      setTotalCount(messagesData.data.totalCount);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

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
              <TableSortLabel
                active={sortBy === "name"}
                direction={sortBy === "name" ? sortOrder : "asc"}
                onClick={() => handleSort("name")}
              >
                {t("MessagesPaginatedPage.name")}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "38%" }}>
              {t("MessagesPaginatedPage.message")}
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "10%" }}>
              <TableSortLabel
                active={sortBy === "gender"}
                direction={sortBy === "gender" ? sortOrder : "asc"}
                onClick={() => handleSort("gender")}
              >
                {t("MessagesPaginatedPage.gender")}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "16%" }}>
              <TableSortLabel
                active={sortBy === "country"}
                direction={sortBy === "country" ? sortOrder : "asc"}
                onClick={() => handleSort("country")}
              >
                {t("MessagesPaginatedPage.country")}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "17%" }}>
              <TableSortLabel
                active={sortBy === "creationDate"}
                direction={sortBy === "creationDate" ? sortOrder : "asc"}
                onClick={() => handleSort("creationDate")}
              >
                {t("MessagesPaginatedPage.creationDate")}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontSize: "16px", width: "4%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.id}</TableCell>
              <TableCell>{message.name}</TableCell>
              <TableCell>
                <Tooltip title={message.message} arrow>
                  {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
                </Tooltip>
              </TableCell>
              <TableCell>
                {t(`MessagesPaginatedPage.${message.gender}`)}
              </TableCell>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 100]}
        component="div"
        count={totalCount} // You need to provide the total count of messages
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MessagePaginatedTable;
