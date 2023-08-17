import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/authApi";
import { getMessages } from "../services/messagesApi"; // Assuming you have a messagesApi module
import { Bar, Pie } from "react-chartjs-2";
import { Grid, Paper, Typography } from "@mui/material"; // Importing Grid and Paper from Material-UI
import Chart from "chart.js/auto";
import { useTranslation } from "react-i18next";

const ReportsPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error(error);

        navigate("/unauthorized");
      }
    };

    const fetchMessageData = async () => {
      try {
        const messages = await getMessages(); // Using the getMessages function from messagesApi
        setMessageData(messages.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    handleCheckLogin();
    fetchMessageData();
  }, []);

  const generateCountryChartData = () => {
    const countryCounts = {};

    messageData.forEach((message) => {
      const country = message.country;
      if (countryCounts[country]) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });

    const sortedCountryCounts = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [country, count]) => {
        obj[country] = count;
        return obj;
      }, {});

    return {
      labels: Object.keys(sortedCountryCounts),
      datasets: [
        {
          label: t("ReportsPage.chart1"),
          data: Object.values(sortedCountryCounts),
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    };
  };

  const generateGenderChartData = () => {
    const genderCounts = {
      male: 0,
      female: 0,
    };

    messageData.forEach((message) => {
      const gender = message.gender;
      genderCounts[gender]++;
    });

    const localizedLabels = Object.keys(genderCounts).map((key) =>
      t(`ReportsPage.${key}`)
    );

    return {
      labels: localizedLabels,
      datasets: [
        {
          label: t("ReportsPage.chart2"),
          data: Object.values(genderCounts),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div>
      {context?.role !== "admin" && <div>{navigate("/unauthorized")}</div>}
      {context?.role === "admin" && (
        <div>
          {messageData && (
            <div>
              <Grid
                container
                sx={{
                  mt: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "70%",
                      width: "70%",
                    }}
                  >
                    <Typography variant="h6" gutterBottom component="div">
                      {t("ReportsPage.chart1")}
                    </Typography>
                    <Bar
                      data={generateCountryChartData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true, // Set to false to allow adjusting the size
                        aspectRatio: 1.2, // Adjust the aspect ratio to control the size
                        height: "50%",
                      }}
                    />
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "70%",
                      height: "70%",
                    }}
                  >
                    <Typography variant="h6" gutterBottom component="div">
                      {t("ReportsPage.chart2")}
                    </Typography>
                    <Pie
                      data={generateGenderChartData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true, // Set to false to allow adjusting the size
                        aspectRatio: 1.2, // Adjust the aspect ratio to control the size
                        height: "50%",
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
