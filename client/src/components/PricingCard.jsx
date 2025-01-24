import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const PricingCard = ({ title, price, features, isPopular, mode }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        border: isPopular ? 2 : 0,
        borderColor: 'primary.main',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: mode === 'light'
            ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            : '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
        },
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '9999px',
            px: 2,
            py: 0.5,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Popular
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h5" 
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
            <Typography 
              variant="h3" 
              component="span"
              sx={{ 
                fontWeight: 800,
                color: isPopular ? 'primary.main' : 'inherit',
              }}
            >
              {price}
            </Typography>
            <Typography 
              variant="subtitle1" 
              component="span"
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              /month
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 4 }}>
          {features.map((feature, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
              }}
            >
              <CheckCircle 
                sx={{ 
                  mr: 1.5, 
                  color: isPopular ? 'primary.main' : 'success.main',
                  fontSize: 20,
                }} 
              />
              <Typography>{feature}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant={isPopular ? "contained" : "outlined"}
          color="primary"
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            mt: 'auto',
          }}
        >
          Choose Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;