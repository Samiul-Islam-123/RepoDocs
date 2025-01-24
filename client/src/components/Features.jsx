import { Container, Grid, Typography } from '@mui/material';
import { Speed, Security, Analytics } from '@mui/icons-material';
import FeatureCard from './FeatureCard';

const Features = ({ mode }) => {
  const features = [
    {
      icon: <Speed sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Lightning Fast',
      description: 'Our platform is optimized for maximum performance.',
    },
    {
      icon: <Security sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Secure by Design',
      description: 'Enterprise-grade security for your peace of mind.',
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Get insights with our powerful analytics tools.',
    },
  ];

  return (
    <Container sx={{ py: 12 }} maxWidth="lg">
      <Typography 
        variant="h2" 
        align="center" 
        gutterBottom
        sx={{ mb: 8 }}
      >
        Features
      </Typography>
      <Grid container spacing={6}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} md={4}>
            <FeatureCard {...feature} mode={mode} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;