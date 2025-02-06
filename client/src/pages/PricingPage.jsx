import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useThemeContext } from '../context/ThemeContext';
import { createAppTheme } from '../theme';
import Pricing from '../components/Pricing';

function PricingPage() {
  const { mode, setMode } = useThemeContext();
  const theme = createAppTheme(mode);

  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar mode={mode} onToggleMode={handleToggleMode} />
        <Pricing mode={mode} />
        <Footer mode={mode} />
      </Box>
    </ThemeProvider>
  );
}

export default PricingPage;
