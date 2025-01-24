import { Box, Button, Container, Typography } from '@mui/material';

const Hero = ({ mode }) => {
  return (
    <Box
      sx={{
        pt: 15,
        pb: 12,
        background: mode === 'light'
          ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
          : 'linear-gradient(135deg, #4F46E5 0%, #BE185D 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
        },
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            background: 'linear-gradient(to right, #FFFFFF, rgba(255,255,255,0.9))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Transform Your Business
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          paragraph
          sx={{ 
            opacity: 0.9,
            mb: 4,
            fontWeight: 'normal',
          }}
        >
          Streamline your workflow with our powerful SAAS solution
        </Typography>
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              background: 'rgba(255,255,255,1)',
              color: 'primary.main',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              color: 'white', 
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;