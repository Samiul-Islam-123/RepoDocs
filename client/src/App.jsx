import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme } from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import LandingPage from './pages/LandingPage';
import RoutesManager from './utils/RoutesManager';

function App() {
  const [mode, setMode] = useState('light');
  const theme = createAppTheme(mode);

  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    
      <RoutesManager />
   
  );
}

export default App;