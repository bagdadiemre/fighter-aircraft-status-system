import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { addNewUserWithReaderRole } from "../services/usersApi";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Snackbar,
  Button,
  Typography,
  Alert,
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
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [photoError, setPhotoError] = useState(false);

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

  const getRemainingChars = (currentLength, maxLength) => {
    return `${currentLength}/${maxLength}`;
  };

  const handleAddUser = async () => {
    if (!username || !password || !imageFile) {
      // Set the error states
      setUsernameError(!username);
      setPasswordError(!password);
      setPhotoError(!imageFile);
      return;
    }

    try {
      const response = await addNewUserWithReaderRole(
        username,
        password,
        base64Photo
      );
      // Handle the successful response here
      console.log("User added successfully:", response);
      setSuccessOpen(true);
      // Navigate to the "Users Page" after successful user addition
      navigate("/users");
    } catch (error) {
      console.error("Add User failed:", error);
      setErrorOpen(true);
      // Handle the error here, such as showing an error message to the user
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  return (
    <>
      {context?.role !== "admin" && <div>{navigate("/unauthorized")}</div>}
      {context?.role === "admin" && (
        <div>
          <Container
            maxWidth="xs"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Card
              sx={{
                marginBottom: "90px",
              }}
            >
              <CardHeader
                avatar={
                  <div
                    onClick={() => {
                      if (imageFile) {
                        setImageFile(null);
                        setBase64Photo("");
                      } else {
                        setPhotoError(false);
                        document.getElementById("upload-photo").click();
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <Avatar
                      alt={username}
                      src={base64Photo}
                      sx={{
                        width: 80,
                        height: 80,
                        border: photoError
                          ? "2px solid red"
                          : "2px solid transparent",
                      }}
                    />

                    {imageFile ? (
                      <ClearIcon
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "2px",
                          cursor: "pointer",
                          fontSize: 18,
                          color: "red",
                        }}
                      />
                    ) : (
                      <AddIcon
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "2px",
                          cursor: "pointer",
                          fontSize: 18,
                          color: "red",
                        }}
                      />
                    )}
                  </div>
                }
                titleTypographyProps={{ variant: "h6" }}
                title={`Username: ${username}`}
                subheaderTypographyProps={{ variant: "subtitle1" }}
                subheader={`Role: Reader`}
              />

              <CardContent>
                <TextField
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(false);
                  }}
                  error={usernameError}
                  helperText={usernameError && "Username is required"}
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    mb: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ textAlign: "right" }}
                >
                  {getRemainingChars(username.length, 10)}
                </Typography>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  error={passwordError}
                  helperText={passwordError && "Password is required"}
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    mt: 2,
                  }}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ textAlign: "right" }}
                >
                  {getRemainingChars(password.length, 10)}
                </Typography>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
              </CardActions>
            </Card>
            <Snackbar
              open={successOpen}
              autoHideDuration={6000}
              onClose={handleSuccessClose}
            >
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                User added successfully!
              </Alert>
            </Snackbar>
            <Snackbar
              open={errorOpen}
              autoHideDuration={6000}
              onClose={handleErrorClose}
            >
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Error adding user!
              </Alert>
            </Snackbar>
          </Container>
        </div>
      )}
    </>
  );
};

export default UsersAddPage;
