import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { addNewUserWithReaderRole } from "../services/usersApi";
import Header from "../components/Common/Header";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const UsersAddPage = () => {
  const navigate = useNavigate();
  const { context, setContext } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [base64Photo, setBase64Photo] = useState("");
  const [imageFile, setImageFile] = useState(null);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = `data:${file.type};base64,${
          e.target.result.split(",")[1]
        }`;
        setBase64Photo(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await addNewUserWithReaderRole(
        username,
        password,
        base64Photo
      );
      // Handle the successful response here
      console.log("User added successfully:", response);
      // Navigate to the "Users Page" after successful user addition
      navigate("/users");
    } catch (error) {
      console.error("Add User failed:", error);
      // Handle the error here, such as showing an error message to the user
    }
  };

  return (
    <>
      <Header headerName={"Users Add Page"} context={context} />

      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Card>
          <CardHeader
            avatar={
              <div
                onClick={() => {
                  if (imageFile) {
                    setImageFile(null);
                    setBase64Photo("");
                  } else {
                    document.getElementById("upload-photo").click();
                  }
                }}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <Avatar
                  alt={username}
                  src={base64Photo}
                  sx={{ width: 80, height: 80 }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "2px",
                    cursor: "pointer",
                  }}
                >
                  {imageFile ? (
                    <ClearIcon style={{ fontSize: 18, color: "red" }} />
                  ) : (
                    <AddIcon style={{ fontSize: 18, color: "green" }} />
                  )}
                </div>
              </div>
            }
            titleTypographyProps={{ variant: "h6" }}
            title={`User: ${username}`}
            subheaderTypographyProps={{ variant: "subtitle1" }}
            subheader={`Role: Reader`}
          />

          <CardContent>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <label htmlFor="upload-photo">
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>
          </CardContent>
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default UsersAddPage;
