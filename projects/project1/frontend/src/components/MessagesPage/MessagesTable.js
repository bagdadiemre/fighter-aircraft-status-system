import React, { useEffect, useState } from "react";
import { getMessages } from "../../services/messagesApi";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);

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

  return (
    <TableContainer component={Paper} sx={{ mt: 8, userSelect: "none" }}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#f0f0f0", // Custom background color
          }}
        >
          <TableRow>
            <TableCell sx={{ fontSize: "17px" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Message</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Gender</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <TableCell sx={{ fontSize: "16px" }}>{message.name}</TableCell>
              <TableCell sx={{ fontSize: "16px" }}>{message.message}</TableCell>
              <TableCell sx={{ fontSize: "16px" }}>{message.gender}</TableCell>
              <TableCell sx={{ fontSize: "16px" }}>{message.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessagesTable;
