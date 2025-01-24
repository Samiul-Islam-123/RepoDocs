import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import { useState } from 'react'
import { createAppTheme } from '../theme'
import { useThemeContext } from '../context/ThemeContext'


function LandingPage() {

    const {mode, setMode} = useThemeContext();
  const theme = createAppTheme(mode);

  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
        <Navbar mode={mode} onToggleMode={handleToggleMode} />
        <Hero mode={mode} />
        <Features mode={mode} />
        <Pricing mode={mode} />
      </Box>
    </ThemeProvider>
    </>
  )
}

export default LandingPage