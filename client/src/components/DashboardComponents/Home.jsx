import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

function Home() {
  const { mode } = useThemeContext();

  const profileData = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    boltsLeft: 120,
    generations: 54,
    historyCount: 230,
  };

  const stats = [
    { title: "Generations", value: profileData.generations, color: "#4caf50" },
    { title: "History", value: profileData.historyCount, color: "#f57c00" },
    { title: "Bolts Left", value: profileData.boltsLeft, color: "#2196f3" },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        backgroundColor: mode === "dark" ? "#1c1c1c" : "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        color: mode === "light" ? "#F7FAFC" : "#1A202C",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={600}
        align="center"
        gutterBottom
        sx={{
          color: mode === "dark" ? "#ffffff" : "#222",
        }}
      >
        Welcome Back, {profileData.name}!
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, color: mode === "dark" ? "#aaa" : "#555" }}>
        Here's an overview of your activity and stats.
      </Typography>

      {/* Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                backgroundColor: mode === "dark" ? "#333" : "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: mode === "dark" ? "#e0e0e0" : "#555",
                    mb: 2,
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Profile Summary */}
      <Box
        sx={{
          backgroundColor: mode === "dark" ? "#292929" : "#f1f1f1",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          {/* Avatar */}
          <Avatar
            src="https://via.placeholder.com/150"
            alt={profileData.name}
            sx={{
              width: 100,
              height: 100,
              border: `4px solid ${mode === "dark" ? "#444" : "#ddd"}`,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          />

          {/* Profile Info */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: mode === "dark" ? "#ffffff" : "#222",
              }}
            >
              {profileData.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: mode === "dark" ? "#aaa" : "#555",
              }}
            >
              Username: <strong>{profileData.username}</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: mode === "dark" ? "#aaa" : "#555",
              }}
            >
              Email: <strong>{profileData.email}</strong>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default Home;
