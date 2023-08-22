import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { ArrowForward, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UsersTable = ({ users }) => {
  const { t } = useTranslation();
  return (
    <TableContainer
      component={Paper}
      sx={{
        userSelect: "none",
        maxWidth: 600,
        margin: "auto",
        mt: 10,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "4%" }}>
              <Typography variant="subtitle1">{t("UsersPage.profile")}</Typography>
            </TableCell>
            <TableCell sx={{ width: "37%" }}>
              <Typography variant="subtitle1">{t("UsersPage.username")}</Typography>
            </TableCell>
            <TableCell sx={{ width: "37%" }}>
              <Typography variant="subtitle1">{t("UsersPage.password")}</Typography>
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <Typography variant="subtitle1">{t("UsersPage.role")}</Typography>
            </TableCell>
            <TableCell sx={{ width: "12%" }}>
              <IconButton component={Link} to={`/add-user`} size="small">
                <Add />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar alt={user.username} src={user.base64Photo} />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{user.username}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{user.password}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  {t(`UsersPage.${user.role}`)}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/users/${user.id}`}
                  size="small"
                >
                  <ArrowForward />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
