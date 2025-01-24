import { Box, Card, CardContent, Typography } from '@mui/material';

const FeatureCard = ({ icon, title, description, mode }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 4,
        background: mode === 'light' ? 'white' : 'background.paper',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: mode === 'light'
            ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            : '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        {icon}
      </Box>
      <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h2"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;