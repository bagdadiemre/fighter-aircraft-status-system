import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkLogin } from "../services/authApi";
import { useTranslation } from "react-i18next";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Alert,
  Collapse,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getUserById, updateUserById } from "../services/usersApi";

const UsersDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { context, setContext } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState({
    username: "",
    password: "",
    base64Photo: "",
    isDirty: false,
  });
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const { t } = useTranslation();

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

  const handleSuccessOpen = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
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

      handleSuccessOpen();
    } catch (error) {
      console.error("Error updating user:", error);

      handleErrorOpen();
    }
  };

  return (
    <>
      {" "}
      {context?.role !== "admin" && <div>{navigate("/unauthorized")}</div>}
      {context?.role === "admin" && (
        <div>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            <Card sx={{ maxWidth: 400 }}>
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
                          borderRadius: "50%",
                          padding: "2px",
                          width: 16,
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
                title={`${t("UsersDetailPage.username")}: ${user.username}`}
                subheaderTypographyProps={{ variant: "subtitle1" }}
                subheader={`${t("UsersDetailPage.role")}:  ${t(`UsersDetailPage.${user.role}`)}`}
              />

              <CardActions sx={{ ml: 1, mb: 1 }}>
                {!editing && (
                  <Button
                    onClick={() => setEditing(!editing)}
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#006d77", color: "white" }}
                  >
                    {editing
                      ? t("UsersDetailPage.cancel")
                      : t("UsersDetailPage.edit")}
                  </Button>
                )}
                {editing && (
                  <Button
                    onClick={handleUpdate}
                    variant="contained"
                    style={{
                      backgroundColor: editedUser.isDirty ? "#006d77" : "gray",
                      color: "white",
                    }}
                    disabled={!editedUser.isDirty}
                  >
                    {t("UsersDetailPage.save")}
                  </Button>
                )}
                {editing && (
                  <Button
                    onClick={() => setEditing(false)}
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Cancel
                  </Button>
                )}
              </CardActions>

              <Collapse in={editing}>
                <CardContent>
                  <TextField
                    label={t("UsersDetailPage.password")}
                    fullWidth
                    value={editedUser.password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        password: e.target.value,
                        isDirty: true,
                      })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#83c5be",
                        },
                        "&:hover fieldset": {
                          borderColor: "#83c5be",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#83c5be",
                        },
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#83c5be",
                      },
                      mb: 2,
                    }}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          size="small"
                          sx={{ height: "100%" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#006d77" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#006d77" }} />
                          )}
                        </Button>
                      ),
                    }}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Container>

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
              User updated successfully!
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
              Error updating user!
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default UsersDetailPage;
