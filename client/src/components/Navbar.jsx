import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ mode }) => {

  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            color: mode === 'light' ? 'primary.main' : 'white',
          }}
        >
          {import.meta.env.VITE_APP_NAME}
        </Typography>

        <Button 
        onClick={() => {
          navigate('/dashboard')
        }}
            variant="outlined" 
            size="large"
            sx={{ 
              color: 'white', 
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Dashboard
          </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;