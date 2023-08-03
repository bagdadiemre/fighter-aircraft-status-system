import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin, logout } from "../services/authApi";
import MessagesTable from "../components/MessagesPage/MessagesTable";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";

const MessagesPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Messages Page
          </Typography>
          {context?.role === "admin" && (
            <div>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/reports">
                Reports
              </Button>
            </div>
          )}
          <div>
            <Button
              color="inherit"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar src={context?.base64Photo} alt={context?.username} />
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{context?.username}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <MessagesTable />
      </Container>
    </div>
  );
};

export default MessagesPage;
