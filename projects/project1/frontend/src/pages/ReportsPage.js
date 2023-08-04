import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/authApi";
import { getMessages } from "../services/messagesApi"; // Assuming you have a messagesApi module
import { Bar, Pie } from "react-chartjs-2";
import { Grid, Paper } from "@mui/material"; // Importing Grid and Paper from Material-UI
import Chart from "chart.js/auto";

const ReportsPage = () => {
  const { context, setContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const data = await checkLogin();
        setContext(data.data.user);
      } catch (error) {
        console.error(error);
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
          label: "Message Count by Country",
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

    return {
      labels: Object.keys(genderCounts),
      datasets: [
        {
          label: "Message Count by Gender",
          data: Object.values(genderCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div>
      {context?.role !== "admin" && <div>{navigate("./unauthorized")}</div>}
      {context?.role === "admin" && (
        <div>
          <h2>Reports Page</h2>
          {messageData && (
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <h3>Message Count by Country</h3>
                    <Bar data={generateCountryChartData()} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <h3>Message Count by Gender</h3>
                    <Pie data={generateGenderChartData()} />
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
