import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import Header from "../components/Common/Header";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getUserById, updateUserById } from "../services/usersApi";

const UsersDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const { context, setContext } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState({
    username: "",
    password: "",
    base64Photo: "",
    isDirty: false,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData.data.user);
        setEditedUser({
          username: userData.data.user.username,
          password: userData.data.user.password,
          base64Photo: userData.data.user.base64Photo,
          isDirty: false,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error(error);
        navigate("/unauthorized");
      }
    };

    handleCheckLogin();
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && editing) {
      // Only allow image upload when editing
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = `data:${file.type};base64,${
          e.target.result.split(",")[1]
        }`;
        setEditedUser({
          ...editedUser,
          base64Photo: base64Image,
          isDirty: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUserById(
        id,
        editedUser.username,
        editedUser.password,
        editedUser.base64Photo
      );
      setEditing(false);
      setUser({ ...user, ...editedUser });
      setEditedUser({ ...editedUser, isDirty: false });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Header headerName={"Users Detail Page"} context={context} />

      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Card>
          <CardHeader
            avatar={
              <label
                htmlFor="upload-photo"
                style={{
                  cursor: editing ? "pointer" : "default",
                  position: "relative",
                }}
              >
                <Avatar
                  alt={user.username}
                  src={editedUser.base64Photo}
                  sx={{ width: 80, height: 80 }}
                />
                {editing && (
                  <EditIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "2px",
                      width: 16, // Adjust the width and height as needed
                      height: 16,
                    }}
                  />
                )}
                {editing && (
                  <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                )}
              </label>
            }
            titleTypographyProps={{ variant: "h6" }}
            title={`User: ${user.username}`}
            subheaderTypographyProps={{ variant: "subtitle1" }}
            subheader={`Role: ${user.role}`}
          />
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Button
              onClick={() => setEditing(!editing)}
              variant="contained"
              color="primary"
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
            {editing && (
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                disabled={!editedUser.isDirty} // Disable save button if no changes
              >
                Save
              </Button>
            )}
          </CardActions>
          <Collapse in={editing}>
            <CardContent>
              <TextField
                label="Username"
                fullWidth
                value={editedUser.username}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    username: e.target.value,
                    isDirty: true,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                fullWidth
                value={editedUser.password}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    password: e.target.value,
                    isDirty: true,
                  })
                }
                sx={{ mb: 2 }}
              />

              <Typography variant="body2">
                Original Password: {user.password}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    </>
  );
};

export default UsersDetailPage;
