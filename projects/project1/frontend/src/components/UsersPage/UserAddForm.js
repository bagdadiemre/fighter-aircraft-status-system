import React from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";

const UserAddForm = ({
  handleAddUser,
  username,
  setUsername,
  password,
  setPassword,
  show,
}) => {
  
  return (
    <Card
      sx={{
        width: 400,
      }}
    >
      <CardContent>
        <form onSubmit={handleAddUser}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 0 }}
          >
            Add User
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserAddForm;