import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText, 
  Paper,
  Chip,
  FormHelperText,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import { useSocket } from '../../context/SocketContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Preview, Edit, Settings, ContentCopy } from '@mui/icons-material';

function Generate() {
  const [repoURL, setRepoURL] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { mode } = useThemeContext();
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('generate-response', data => {
        if (data.status === 'pending') {
          setGeneratedReadme(prev => prev + data.data);
        }
        if (data.status === 'completed') {
          setIsGenerating(false);
        }
      });
    }
  }, [socket]);

  const handleGenerateReadme = () => {
    if (connected) {
      setIsGenerating(true);
      setGeneratedReadme("")
      socket.emit("generate-request", { 
        repoURL, 
        selectedOptions,
        customInstructions 
      });
    }
  };

  const darkMode = mode === 'dark';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: '100vh' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Configuration Panel */}
        <Grid item xs={12} md={3} lg={2.5}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: darkMode ? '#1A1A1A' : '#FFF'
          }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings fontSize="small" />
              <Typography variant="h6" sx={{ color: darkMode ? '#FFF' : '#333' }}>
                Configuration
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="GitHub Repo URL"
              variant="outlined"
              value={repoURL}
              onChange={(e) => setRepoURL(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  color: darkMode ? '#FFF' : '#333',
                  backgroundColor: darkMode ? '#333' : '#FAFAFA'
                }
              }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sections</InputLabel>
              <Select
                multiple
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {['installation', 'usage', 'contributing', 'license'].map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={selectedOptions.includes(option)} size="small" />
                    <ListItemText primary={option.charAt(0).toUpperCase() + option.slice(1)} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select README sections</FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              label="Custom Instructions"
              variant="outlined"
              multiline
              rows={3}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  color: darkMode ? '#FFF' : '#333',
                  backgroundColor: darkMode ? '#333' : '#FAFAFA'
                }
              }}
              helperText={`${customInstructions.length}/500 characters`}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleGenerateReadme}
              disabled={!repoURL || isGenerating}
              sx={{ 
                mt: 'auto',
                py: 1.5,
                bgcolor: darkMode ? '#4CAF50' : '#2E7D32',
                '&:hover': {
                  bgcolor: darkMode ? '#45A049' : '#1B5E20'
                }
              }}
            >
              {isGenerating ? (
                <CircularProgress size={24} sx={{ color: '#FFF' }} />
              ) : (
                'Generate README'
              )}
            </Button>
          </Paper>
        </Grid>

        {/* Editor Panel */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper sx={{ 
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: darkMode ? '#1A1A1A' : '#FAFAFA'
          }}>
            <Box sx={{ 
              p: 2,
              borderBottom: `1px solid ${darkMode ? '#333' : '#EEE'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Edit fontSize="small" />
                <Typography variant="h6" sx={{ color: darkMode ? '#FFF' : '#333' }}>
                  Markdown Editor
                </Typography>
              </Box>
              <Tooltip title="Copy to Clipboard">
                <IconButton onClick={handleCopyToClipboard} size="small">
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <TextField
              fullWidth
              multiline
              value={generatedReadme}
              onChange={(e) => setGeneratedReadme(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  height: '80vh',
                  alignItems: 'flex-start',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  padding: 2,
                }
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  color: darkMode ? '#FFF' : '#333',
                  '& textarea': {
                    overflow: 'auto !important',
                    resize: 'none'
                  }
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} md={5} lg={5.5}>
          <Paper sx={{ 
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: darkMode ? '#1A1A1A' : '#FAFAFA'
          }}>
            <Box sx={{ 
              p: 2,
              borderBottom: `1px solid ${darkMode ? '#333' : '#EEE'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Preview fontSize="small" />
              <Typography variant="h6" sx={{ color: darkMode ? '#FFF' : '#333' }}>
                Live Preview
              </Typography>
            </Box>
            
            <Box sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              color: darkMode ? '#FFF' : '#333',
              '& h1': { fontSize: '2rem', fontWeight: 600, my: 2 },
              '& h2': { fontSize: '1.5rem', fontWeight: 500, my: 1.5 },
              '& code': { 
                backgroundColor: darkMode ? '#333' : '#EEE',
                padding: '2px 4px',
                borderRadius: '4px'
              },
              '& pre': {
                backgroundColor: darkMode ? '#333' : '#EEE',
                padding: '16px',
                borderRadius: '8px',
                overflowX: 'auto'
              }
            }}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {generatedReadme}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Generate;