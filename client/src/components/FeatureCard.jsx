import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, mode, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <Box sx={{
        p: 3,
        height: '100%',
        borderRadius: 2,
        bgcolor: mode === 'light' ? 'background.paper' : 'grey.900',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        }
      }}>
        <Box sx={{ 
          width: 60,
          height: 60,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          color: 'white'
        }}>
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default FeatureCard; 