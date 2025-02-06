import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import {
  Bolt,
  Description,
  History,
  Add,
  Link,
  Code,
  DescriptionOutlined
} from "@mui/icons-material";
import { useUser } from "@clerk/clerk-react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { mode } = useThemeContext();
  const { user } = useUser();
  const { bolts, totalGenerations } = useSocket();
  const navigate = useNavigate();

  const userStats = {
    bolts: bolts,
    totalGenerations: totalGenerations
  };

  const stats = [
    { 
      title: "Bolts Remaining",
      value: userStats.bolts,
      icon: <Bolt fontSize="medium" />,
      color: "#FFD700",
      description: "Generation credits available"
    },
    { 
      title: "Total Generations",
      value: userStats.totalGenerations,
      icon: <Description fontSize="medium" />,
      color: "#4CAF50",
      description: "All-time READMEs created"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{
      py: 4,
      backgroundColor: mode === "dark" ? "#121212" : "#f8f9fa",
      minHeight: "100vh"
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          color: mode === "dark" ? "#fff" : "#2d3436",
          mb: 1
        }}>
          Welcome back, {user.firstName}!
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: mode === "dark" ? "#b2bec3" : "#636e72",
          fontWeight: 400
        }}>
          Craft perfect READMEs in seconds
        </Typography>
      </Box>

      {/* First Row - Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{
              backgroundColor: mode === "dark" ? "#1a1a1a" : "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              height: "100%"
            }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{
                    color: stat.color,
                    p: 1.5,
                    borderRadius: "8px",
                    backgroundColor: mode === "dark" ? "#ffffff10" : "#00000005"
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{
                      color: mode === "dark" ? "#fff" : "#2d3436",
                      fontWeight: 700,
                      lineHeight: 1.2
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle1" sx={{
                      color: mode === "dark" ? "#b2bec3" : "#636e72",
                      fontWeight: 500
                    }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Second Row - Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: mode === "dark" ? "#1a1a1a" : "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ 
                mb: 2,
                color: mode === "dark" ? "#fff" : "#2d3436",
                fontWeight: 600
              }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                  onClick={() => {
                    navigate('/dashboard/generate');
                  }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<Add />}
                    
                    sx={{ 
                      py: 2,
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: 500
                    }}
                  >
                    Generate New README
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                  onClick={() => {
                    navigate('/dashboard/history');
                  }}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    startIcon={<History />}
                  
                    sx={{ 
                      py: 2,
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: 500
                    }}
                  >
                    View History
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Third Row - Quick Guide */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: mode === "dark" ? "#1a1a1a" : "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ 
                mb: 2,
                color: mode === "dark" ? "#fff" : "#2d3436",
                fontWeight: 600,
                textAlign: "center"
              }}>
                How It Works
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Stack alignItems="center" spacing={1.5}>
                    <Box sx={{
                      backgroundColor: mode === "dark" ? "#FFD70020" : "#FFD70010",
                      p: 2,
                      borderRadius: "50%"
                    }}>
                      <Link fontSize="medium" sx={{ color: "#FFD700" }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: mode === "dark" ? "#fff" : "#2d3436",
                      textAlign: "center"
                    }}>
                      Paste Repository URL
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: mode === "dark" ? "#b2bec3" : "#636e72",
                      textAlign: "center"
                    }}>
                      Start with your GitHub project link
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack alignItems="center" spacing={1.5}>
                    <Box sx={{
                      backgroundColor: mode === "dark" ? "#4CAF5020" : "#4CAF5010",
                      p: 2,
                      borderRadius: "50%"
                    }}>
                      <Code fontSize="medium" sx={{ color: "#4CAF50" }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: mode === "dark" ? "#fff" : "#2d3436",
                      textAlign: "center"
                    }}>
                      AI Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: mode === "dark" ? "#b2bec3" : "#636e72",
                      textAlign: "center"
                    }}>
                      Automatic code structure analysis
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack alignItems="center" spacing={1.5}>
                    <Box sx={{
                      backgroundColor: mode === "dark" ? "#2196F320" : "#2196F310",
                      p: 2,
                      borderRadius: "50%"
                    }}>
                      <DescriptionOutlined fontSize="medium" sx={{ color: "#2196F3" }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: mode === "dark" ? "#fff" : "#2d3436",
                      textAlign: "center"
                    }}>
                      Get README
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: mode === "dark" ? "#b2bec3" : "#636e72",
                      textAlign: "center"
                    }}>
                      Download formatted markdown
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fourth Row - Bolt Usage */}
      <Box sx={{ 
        mt: 4,
        textAlign: "center",
        p: 2,
        backgroundColor: mode === "dark" ? "#1a1a1a" : "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <Typography variant="h6" sx={{ 
          color: mode === "dark" ? "#fff" : "#2d3436",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5
        }}>
          <Bolt sx={{ color: "#FFD700", fontSize: "1.5rem" }} />
          Each generation uses 2 Bolt
          <Bolt sx={{ color: "#FFD700", fontSize: "1.5rem" }} />
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;