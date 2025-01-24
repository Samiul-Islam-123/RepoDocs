import { Box, Container, Grid, Typography } from '@mui/material';
import PricingCard from './PricingCard';

const Pricing = ({ mode }) => {
  const pricing = [
    {
      title: 'Starter',
      price: '$9',
      features: ['1 User', '10 Projects', 'Basic Support'],
      isPopular: false,
    },
    {
      title: 'Pro',
      price: '$29',
      features: ['5 Users', 'Unlimited Projects', 'Priority Support'],
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: '$99',
      features: ['Unlimited Users', 'Custom Features', '24/7 Support'],
      isPopular: false,
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: mode === 'light' ? 'grey.50' : 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 8 }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4}>
          {pricing.map((plan, index) => (
            <Grid item key={index} xs={12} md={4}>
              <PricingCard {...plan} mode={mode} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;