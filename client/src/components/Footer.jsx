import { Box, Container, Grid, Typography, Link, IconButton, TextField, Button } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"

const Footer = ({ mode }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit =async () => {
    console.log('User Feedback:', feedback);
    const token = Cookies.get('token');
    console.log(`${import.meta.env.VITE_API_URL}/api/feedback`)
    if(feedback){
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback`,
        
        {
          message : feedback
        },
        {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
          }
        }
      
      )
      console.log(response)
      alert(response.data.message)
    }
    setFeedback('');
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: mode === 'dark' ? 'background.paper' : 'grey.100',
        borderTop: `1px solid ${mode === 'dark' ? '#2D2D2D' : '#E0E0E0'}`,
        minHeight: '150px' // Added height at the bottom
      }}
    >
      <Container maxWidth="lg" sx={{
        marginBottom : "150px",
        marginTop : "150px"
      }}>
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          {/* Company Info */}
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              RepoDocs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered documentation solutions.
            </Typography>
          </Grid>

          {/* Product Links */}
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Product
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" underline="hover" color="text.secondary">Features</Link></li>
              <li><Link href="#" underline="hover" color="text.secondary">Pricing</Link></li>
              <li><Link href="#" underline="hover" color="text.secondary">Docs</Link></li>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href='https://github.com/Samiul-Islam-123/' aria-label="GitHub" color="primary">
                <GitHub />
              </IconButton>
              <IconButton href='https://x.com/Samiul_110' aria-label="Twitter" color="primary">
                <Twitter />
              </IconButton>
              <IconButton href='https://www.linkedin.com/in/md-samiul-islam-b98475272/' aria-label="LinkedIn" color="primary">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Feedback Form */}
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Feedback
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Your thoughts..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
