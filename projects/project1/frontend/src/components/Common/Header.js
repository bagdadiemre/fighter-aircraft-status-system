import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authApi";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

const Header = ({ headerName, context }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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
    <AppBar
      position="static"
      sx={{
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <Toolbar sx={{ backgroundColor: "#006d77", borderRadius: "10px" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {headerName}
        </Typography>
        {context?.role === "admin" && (
          <div>
            {headerName !== "Messages Page" && (
              <Button color="inherit" component={Link} to="/messages">
                Messages
              </Button>
            )}
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
  );
};

export default Header;
