import { Container, Grid, Typography } from '@mui/material';
import { Code, IntegrationInstructions, Preview, LibraryBooks } from '@mui/icons-material';
import FeatureCard from './FeatureCard';

const Features = ({ mode }) => {
  const features = [
    {
      icon: <Code sx={{ fontSize: 48 }} />,
      title: 'AI-Powered Analysis',
      description: 'Automatically analyzes your codebase to generate comprehensive documentation',
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 48 }} />,
      title: 'GitHub Integration',
      description: 'Directly connect your repositories for instant README generation',
    },
    {
      icon: <Preview sx={{ fontSize: 48 }} />,
      title: 'Real-time Preview',
      description: 'See your README render live as you make changes',
    },
    // {
    //   icon: <LibraryBooks sx={{ fontSize: 48 }} />,
    //   title: 'Smart Templates',
    //   description: 'Choose from industry-standard templates for different project types',
    // },
  ];

  return (
    <Container sx={{ py: 12 }} maxWidth="lg">
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom
        sx={{ mb: 8, fontWeight: 700 }}
      >
        Why Choose RepoDocs ?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} md={6} lg={4}>
            <FeatureCard 
              {...feature} 
              mode={mode} 
              delay={index * 0.2} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;