import { Box, CssBaseline, ThemeProvider, keyframes } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import { useState } from 'react'
import { createAppTheme } from '../theme'
import { useThemeContext } from '../context/ThemeContext'
import { useInView } from 'react-intersection-observer'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

// Animation keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


function LandingPage() {
  const { mode, setMode } = useThemeContext();
  const theme = createAppTheme(mode);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const navigate = useNavigate();
  const handlePricingClick = () => {
    navigate('/pricing'); // Redirect to /pricing when clicked
  };
  
  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar mode={mode} onToggleMode={handleToggleMode} />
        
        {/* Hero Section */}
        <Box ref={heroRef} sx={{
          animation: heroInView ? `${fadeIn} 1s ease-out` : 'none',
          pt: 15,
          pb: 12,
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)' 
            : 'linear-gradient(135deg, #4F46E5 0%, #BE185D 100%)',
          backgroundSize: '200% 200%',
          animation: `${gradientAnimation} 10s ease infinite`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Hero mode={mode} />
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{
          opacity: featuresInView ? 1 : 0,
          transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
        }}>
          <Features mode={mode} />
        </Box>

        <Box onClick={handlePricingClick} sx={{ cursor: 'pointer' }}>
          <Pricing mode={mode} />
        </Box>
        <Footer mode={mode} />
      </Box>
    </ThemeProvider>
  )
}

export default LandingPage