import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { GitHub, AutoAwesome, Link, Settings, Psychology, RocketLaunch } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WorkflowStep = ({ active, icon, text }) => {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 100,
      mx: 2,
      opacity: active ? 1 : 0.3,
      transition: 'opacity 0.5s ease',
    }}>
      <Box sx={{
        animation: active ? `${pulse} 2s infinite` : 'none',
        color: active ? 'white' : 'rgba(255,255,255,0.5)',
        transition: 'color 0.5s ease',
      }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{
        color: 'white',
        mt: 1,
        textAlign: 'center',
        animation: active ? `${fadeIn} 0.5s ease` : 'none',
        display: active ? 'block' : 'none',
      }}>
        {text}
      </Typography>
    </Box>
  );
};

const Hero = ({ mode }) => {

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { icon: <Link fontSize="large" />, text: 'Paste GitHub URL' },
    { icon: <Settings fontSize="large" />, text: 'Configure Sections' },
    { icon: <Psychology fontSize="large" />, text: 'AI Analysis' },
    { icon: <RocketLaunch fontSize="large" />, text: 'README Generated' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 3,
            '& span': {
              background: 'linear-gradient(to right, #FFFFFF, rgba(255,255,255,0.9))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          }}
        >
          <span>Perfect READMEs akdom jhokas ;)</span><br />
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            position: 'relative',
            height: 100,
          }}>
            {steps.map((step, index) => (
              <WorkflowStep
                key={index}
                active={activeStep === index}
                icon={step.icon}
                text={step.text}
              />
            ))}
            <Box sx={{
              position: 'absolute',
              top: 35,
              width: '80%',
              height: 2,
              background: 'linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
              '&:after': {
                content: '""',
                position: 'absolute',
                left: `${(activeStep * 100) / 3}%`,
                width: '25%',
                height: '100%',
                background: 'white',
                transition: 'left 1s ease',
              }
            }} />
          </Box>
        </Typography>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<AutoAwesome />}
            onClick={() => {
              navigate('/dashboard/generate')
            }}
            sx={{
              px: 4,
              py: 1.5,
              background: 'rgba(255,255,255,1)',
              color: 'primary.main',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s',
              },
            }}
          >
            Start Generating
          </Button>
          {/* <Button 
            variant="outlined" 
            size="large"
            startIcon={<GitHub />}
            sx={{ 
              px: 4,
              py: 1.5,
              color: 'white', 
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            View Samples
          </Button> */}
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
