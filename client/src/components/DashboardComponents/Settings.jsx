import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  Grid,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { useUser } from "@clerk/clerk-react";
import { useSocket } from "../../context/SocketContext";

function Settings() {
  const { mode } = useThemeContext();
  const { user } = useUser();
  const {bolts, setBolts} = useSocket();

  const initialSettings = {
    username: user.fullName,
    email: user.primaryEmailAddress?.emailAddress,
    notifications: true,
    darkMode: mode === "dark",
    avatarURL: user.imageUrl || ""
  };

  const [userSettings, setUserSettings] = useState(initialSettings);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialSettings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    setUserSettings(formData);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setFormData(userSettings);
    setEditMode(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        backgroundColor: mode === "dark" ? "#1c1c1c" : "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        align="center"
        gutterBottom
        sx={{ color: mode === "dark" ? "#ffffff" : "#222" }}
      >
        User Settings
      </Typography>

      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: mode === "dark" ? "#333" : "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar
                  src={userSettings.avatarURL}
                  alt={userSettings.name}
                  sx={{
                    width: 100,
                    height: 100,
                    border: `4px solid ${mode === "dark" ? "#444" : "#ddd"}`,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                />

                {!editMode ? (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: mode === "dark" ? "#ffffff" : "#222",
                      }}
                    >
                      {userSettings.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: mode === "dark" ? "#aaa" : "#555" }}
                    >
                      Username: <strong>{userSettings.username}</strong>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: mode === "dark" ? "#aaa" : "#555" }}
                    >
                      Email: <strong>{userSettings.email}</strong>
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <TextField
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: mode === "dark" ? "#333" : "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "16px",
              textAlign: "center",
              padding: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, color: mode === "dark" ? "#e0e0e0" : "#555" }}
              >
                Refer a Friend
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: mode === "dark" ? "#aaa" : "#555",
                  my: 2,
                  fontSize: "1.2rem",
                }}
              >
                Get free bolts by inviting your friends!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: mode === "dark" ? "#888" : "#666",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                * This feature is coming soon!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;