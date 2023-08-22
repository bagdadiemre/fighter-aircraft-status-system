import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const UnauthorizedPage = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.5rem",
        color: "#757575",
        textAlign: "center",
        marginTop: 2,
      }}
    >
      <img
        src="auth.png" // Replace with the actual path to your unauthorized image
        alt="Unauthorized Access"
        width={700}
        userSelect="none"
        style={{
          maxWidth: 700,
          marginBottom: 2,
        }}
      />

      <div>{t("UnauthorizedPage.unauthorized")}</div>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          marginTop: 2,
          backgroundColor: "#83c5be", // Button color
          "&:hover": {
            backgroundColor: "#68b0a9", // Button hover color
          },
        }}
      >
        {t("UnauthorizedPage.homepage")}
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
