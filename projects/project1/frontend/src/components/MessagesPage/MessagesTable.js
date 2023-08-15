import React, { useEffect, useState } from "react";
import { getMessages } from "../../services/messagesApi";
import { Link } from "react-router-dom";
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
import { ArrowForward } from "@mui/icons-material"; // Import the icon you want to use

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
    <TableContainer component={Paper} sx={{ mt: 5, userSelect: "none", mb: 5 }}>
      <Table>
        <TableHead
        // sx={{
        //   backgroundColor: "#83c5be", // Custom background color
        // }}
        >
          <TableRow>
            <TableCell sx={{ fontSize: "17px", width: "16%" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "17px", width: "32%" }}>
              Message
            </TableCell>
            <TableCell sx={{ fontSize: "17px", width: "16%" }}>
              Gender
            </TableCell>
            <TableCell sx={{ fontSize: "17px", width: "16%" }}>
              Country
            </TableCell>
            <TableCell sx={{ fontSize: "17px", width: "4%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
              // TODO add here a symbol instead of color
              // sx={{
              //   backgroundColor: message.read === "true" ? "white" : "#edf6f9",
              //   // "&:hover": {
              //   //   backgroundColor: "#f5f3f4",
              //   // },
              // }}
            >
              <TableCell sx={{ fontSize: "16px", width: "16%" }}>
                {message.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  width: "32%",
                }}
              >
                <Tooltip title={message.message} arrow>
                  {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
                </Tooltip>
              </TableCell>
              <TableCell sx={{ fontSize: "16px", width: "16%" }}>
                {message.gender}
              </TableCell>
              <TableCell sx={{ fontSize: "16px", width: "16%" }}>
                {message.country}
              </TableCell>
              <TableCell align="center" sx={{ width: "4%" }}>
                {" "}
                {/* Add a cell for the icon */}
                <IconButton
                  component={Link}
                  to={`/messages/${message.id}`}
                  size="small"
                >
                  <ArrowForward /> {/* Use the icon you imported */}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MessagesTable;
