import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = ({ mode }) => {
    return (
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 2,
          mt: 'auto',
          backgroundColor: mode === 'dark' ? 'background.paper' : 'grey.100',
          borderTop: `1px solid ${mode === 'dark' ? '#2D2D2D' : '#E0E0E0'}`
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                README Pro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empowering developers with AI-powered documentation solutions.
              </Typography>
            </Grid>
  
            {/* Product Links */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Product
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li><Link href="#" underline="hover" color="text.secondary">Features</Link></li>
                <li><Link href="#" underline="hover" color="text.secondary">Pricing</Link></li>
                <li><Link href="#" underline="hover" color="text.secondary">Documentation</Link></li>
              </Box>
            </Grid>
  
            {/* Resources */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Resources
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li><Link href="#" underline="hover" color="text.secondary">Blog</Link></li>
                <li><Link href="#" underline="hover" color="text.secondary">Support</Link></li>
                <li><Link href="#" underline="hover" color="text.secondary">Contact</Link></li>
              </Box>
            </Grid>
  
            {/* Social Media */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton aria-label="GitHub" color="primary">
                  <GitHub />
                </IconButton>
                <IconButton aria-label="Twitter" color="primary">
                  <Twitter />
                </IconButton>
                <IconButton aria-label="LinkedIn" color="primary">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
  
          {/* Copyright */}
          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${mode === 'dark' ? '#2D2D2D' : '#E0E0E0'}` }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} README Pro. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
};

export default Footer;
