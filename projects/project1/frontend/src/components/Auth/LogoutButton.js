// components/Auth/LogoutButton.js
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../contexts/AuthContext';

const LogoutButton = () => {
  const { handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    // Call handleLogout function to log the user out
    handleLogout();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogoutClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
