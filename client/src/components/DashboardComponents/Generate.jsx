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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie"

function Generate() {
  const [repoURL, setRepoURL] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { mode } = useThemeContext();
  const { socket, connected, bolts, fetchHistory } = useSocket();
  const [currentHistoryID, setCurrentHistoryID] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('generate-response', data => {
        if (data.status === 'pending') {
          setGeneratedReadme(prev => prev + data.data);
        }

        if (data.success === false) {
          alert(data.message);
          console.log(data)
          setIsGenerating(false)

          // if(data.code === 1){
          //   alert("Navigating to buy route")
          // }
        }




        if (data.status === 'completed') {
          setIsGenerating(false);
          //console.log(generatedReadme, data.historyID);
          setCurrentHistoryID(data.historyID);
          fetchHistory();

          // socket.emit('save-content', {
          //   content : generatedReadme,
          //   historyID : data.historyID
          // })
        }
      });
    }
  }, [socket]);

  const uploadContent = async (content, currentHistoryID) => {
    const token = Cookies.get('token');
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-content`, {
      content: content,
      historyID: currentHistoryID
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response)

    if (response.data.success === false)
      alert(response.data.message)
  }

  useEffect(() => {
    if (isGenerating === false && generatedReadme && currentHistoryID != null) {
      console.log(generatedReadme, currentHistoryID)
      uploadContent(generatedReadme, currentHistoryID)
      setCurrentHistoryID(null)
    }
  }, [isGenerating])

  const navigate = useNavigate();

  const handleGenerateReadme = () => {
    //alert('sending generate event')
    if (connected) {
      if (bolts <= 0) {
        alert("You don't have enough bolts to generate a README")
        navigate('/pricing')
      }
      setIsGenerating(true);
      setGeneratedReadme("");
      socket.emit("generate-request", {
        repoURL,
        selectedOptions,
        customInstructions
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
  };

  const darkMode = mode === 'dark';

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: '100vh' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Configuration Panel */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: darkMode ? '#1A1A1A' : '#FFF'
          }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings sx={{
                color: mode === 'dark' ? "white" : "black"
              }} fontSize="small" />
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
              sx={{ mb: 2, }}
              InputProps={{
                sx: {
                  color: darkMode ? 'white' : 'black',
                  backgroundColor: darkMode ? '#333' : '#FAFAFA'
                }
              }}
              InputLabelProps={{
                sx: {
                  color: darkMode ? 'white' : 'black', // Sets the placeholder (label) color to white
                  '&.Mui-focused': {
                    color: 'white', // Keeps label white when focused
                  },
                },
              }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{
                color: darkMode ? '#FFF' : '#333',
              }}>Sections</InputLabel>
              <Select
                multiple

                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip sx={{
                        color: darkMode ? '#FFF' : '#333',
                      }} key={value} label={value} size="small" />
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
              <FormHelperText sx={{
                color: darkMode ? '#FFF' : '#333',
              }}>Select README sections</FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              label="Custom Instructions"
              variant="outlined"
              multiline
              rows={3}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              sx={{
                mb: 2,
                color: mode === 'dark' ? "white" : "black"
              }}
              InputProps={{
                sx: {
                  color: darkMode ? '#FFF' : '#333',
                  backgroundColor: darkMode ? '#333' : '#FAFAFA'
                }
              }}
              InputLabelProps={{
                sx: {
                  color: mode === 'dark' ? "white" : "black", // Sets the placeholder (label) color to white
                  '&.Mui-focused': {
                    color: 'white', // Keeps label white when focused
                  },
                },
              }}
              helperText={`${customInstructions.length}/500 characters`}
              FormHelperTextProps={{
                sx: {
                  color: mode === 'dark' ? '#FFF' : '#333',
                },
              }}
            />


            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                handleGenerateReadme();
              }}
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

        {/* Editor + Preview Panel */}
        <Grid item xs={12} md={8} lg={9}>
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
              <Typography variant="h6" sx={{ color: darkMode ? '#FFF' : '#333' }}>
                Markdown Editor & Preview
              </Typography>
              <Tooltip title="Copy to Clipboard">
                <IconButton onClick={handleCopyToClipboard} size="small">
                  <ContentCopy sx={{
                    color: darkMode ? '#FFF' : '#333',
                  }} fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
              <Grid item xs={12} md={6} sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
                <TextField
                  fullWidth
                  multiline
                  value={generatedReadme}
                  onChange={(e) => setGeneratedReadme(e.target.value)}
                  sx={{
                    height: '100%',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    p: 2,
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
              </Grid>

              <Grid item style={{
                color: mode === 'dark' ? "white" : "black"
              }} xs={12} md={6} sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter language={match[1]} PreTag="div">
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Generate;
