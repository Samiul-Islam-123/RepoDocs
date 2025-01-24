import { createTheme } from '@mui/material';

export const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#6366F1',
    },
    secondary: {
      main: '#EC4899',
    },
    background: {
      default: mode === 'light' ? '#F9FAFB' : '#111827',
      paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)'
            : '0px 4px 6px -1px rgba(0,0,0,0.2), 0px 2px 4px -1px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(31, 41, 55, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
        },
      },
    },
  },
});