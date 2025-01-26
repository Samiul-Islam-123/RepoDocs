import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Paper } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

function Generate() {
  const [repoURL, setRepoURL] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [generatedReadme, setGeneratedReadme] = useState('');
  const { mode } = useThemeContext();

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);  // This will be an array of selected values
  };

  const handleRepoURLChange = (event) => {
    setRepoURL(event.target.value);
  };

  const handleGenerateReadme = () => {
    // Placeholder logic for generating README content based on repo URL and options
    const optionsText = selectedOptions.join(', ') || 'No additional options selected';
    setGeneratedReadme(`# README for ${repoURL}\n\nThis README is generated with the following options: ${optionsText}`);
  };

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      {/* Flexbox Container for Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        
        {/* Left Side (Input Section) */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: mode === 'dark' ? 'white' : 'black' }}
          >
            Generate README.md
          </Typography>
          <TextField
            label="GitHub Repo URL"
            variant="outlined"
            fullWidth
            value={repoURL}
            onChange={handleRepoURLChange}
            sx={{
              mb: 2,
              backgroundColor: mode === 'dark' ? '#333' : 'white',
              color: mode === 'dark' ? 'white' : 'black',
              '& .MuiInputLabel-root': {
                color: mode === 'dark' ? 'white' : 'black'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: mode === 'dark' ? 'white' : 'black',
                },
              },
              
            }}
          />
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel sx={{ color: mode === 'dark' ? 'white' : 'black' }}>Options</InputLabel>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              renderValue={(selected) => selected.join(', ')}
              sx={{
                backgroundColor: mode === 'dark' ? '#333' : 'white',
                color: mode === 'dark' ? 'white' : 'black',
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'white' : 'black'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                  },
                },
              }}
            >
              <MenuItem value="installation">
                <Checkbox checked={selectedOptions.indexOf('installation') > -1} />
                <ListItemText primary="Installation Instructions" />
              </MenuItem>
              <MenuItem value="usage">
                <Checkbox checked={selectedOptions.indexOf('usage') > -1} />
                <ListItemText primary="Usage Instructions" />
              </MenuItem>
              <MenuItem value="contributing">
                <Checkbox checked={selectedOptions.indexOf('contributing') > -1} />
                <ListItemText primary="Contributing Guidelines" />
              </MenuItem>
              <MenuItem value="license">
                <Checkbox checked={selectedOptions.indexOf('license') > -1} />
                <ListItemText primary="License" />
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="large"
            sx={{ width: '100%', backgroundColor: mode === 'dark' ? '#555' : '#1976d2' }}
            onClick={handleGenerateReadme}
          >
            Generate README.md
          </Button>
        </Box>

        {/* Right Side (Output Section) */}
        {generatedReadme && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Generated README.md
            </Typography>
            <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto', backgroundColor: mode === 'dark' ? '#444' : 'white' }}>
              <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', color: mode === 'dark' ? 'white' : 'black' }}>
                {generatedReadme}
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Generate;
