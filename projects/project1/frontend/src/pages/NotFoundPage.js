import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="404.png" // Replace with the actual path to your 404 image
          alt="Page Not Found"
          width={500}
          userSelect="none" // Prevents the user from selecting the image
          sx={{
            maxWidth: 200, // Adjust the maximum width
            marginBottom: 2,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1.5rem", // Increased the font size for better visibility
            color: "#757575", // Changed the text color
            textAlign: "center", // Center align the text
            marginTop: 2, // Added some top margin for spacing
          }}
        >
          {t("NotFoundPage.notFound")}
        </Typography>

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
          }} // Added some top margin for spacing
        >
          {t("NotFoundPage.homepage")}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
