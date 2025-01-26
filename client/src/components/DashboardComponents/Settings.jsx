import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

function Settings() {
  const { mode } = useThemeContext();

  const userSettings = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    notifications: true,
    darkMode: mode === 'dark',
  };

  return (
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
          backgroundColor: mode === 'dark' ? '#1c1c1c' : '#f9f9f9',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          color: mode === 'light' ? '#F7FAFC' : '#1A202C',
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight={600}
          align="center"
          gutterBottom
          sx={{ color: mode === 'dark' ? '#ffffff' : '#222' }}
        >
          User Settings
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, color: mode === 'dark' ? '#aaa' : '#555' }}
        >
          Manage your preferences and account settings below.
        </Typography>

        {/* Settings Cards */}
        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                backgroundColor: mode === 'dark' ? '#333' : '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                borderRadius: '16px',
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Avatar
                    src="https://via.placeholder.com/150"
                    alt={userSettings.name}
                    sx={{
                      width: 100,
                      height: 100,
                      border: `4px solid ${mode === 'dark' ? '#444' : '#ddd'}`,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    }}
                  />

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: mode === 'dark' ? '#ffffff' : '#222',
                      }}
                    >
                      {userSettings.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: mode === 'dark' ? '#aaa' : '#555',
                      }}
                    >
                      Username: <strong>{userSettings.username}</strong>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: mode === 'dark' ? '#aaa' : '#555',
                      }}
                    >
                      Email: <strong>{userSettings.email}</strong>
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                backgroundColor: mode === 'dark' ? '#333' : '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                borderRadius: '16px',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: mode === 'dark' ? '#e0e0e0' : '#555',
                    mb: 2,
                  }}
                >
                  Preferences
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: mode === 'dark' ? '#aaa' : '#555' }}
                    >
                      Notifications
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: userSettings.notifications
                          ? '#4caf50'
                          : '#f44336',
                      }}
                    >
                      {userSettings.notifications ? 'Enabled' : 'Disabled'}
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: mode === 'dark' ? '#aaa' : '#555' }}
                    >
                      Dark Mode
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: userSettings.darkMode
                          ? '#4caf50'
                          : '#f44336',
                      }}
                    >
                      {userSettings.darkMode ? 'Enabled' : 'Disabled'}
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Settings;
