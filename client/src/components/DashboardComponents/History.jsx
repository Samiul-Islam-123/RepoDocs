import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import { useSocket } from '../../context/SocketContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ContentCopy from '@mui/icons-material/ContentCopy';

function History() {
  const { history, setHistory } = useSocket();
  const { setTotalGenerations } = useSocket();
  const { mode } = useThemeContext();
  const [selectedContent, setSelectedContent] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    console.log(history)
  },[history])

  const handlePreviewOpen = (content) => {
    setSelectedContent(content);
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
    setSelectedContent(null);
  };

  const handleCopyContent = () => {
    if (selectedContent) {
      navigator.clipboard.writeText(selectedContent);
    }
  };

  const tableContainerStyle = {
    backgroundColor: mode === 'dark' ? '#333' : '#fff',
    color: mode === 'dark' ? 'white' : 'black',
  };

  const tableCellStyle = {
    color: mode === 'dark' ? 'white' : 'black',
  };

  const headerCellStyle = {
    backgroundColor: mode === 'dark' ? '#555' : '#1976d2',
    color: mode === 'dark' ? 'white' : 'black',
  };

  const dialogStyle = {
    backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFF',
    color: mode === 'dark' ? 'white' : 'black',
  };

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: mode === 'dark' ? 'white' : 'black' }}
      >
        History of README Generations
      </Typography>

      {/* Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={handlePreviewClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: dialogStyle }}
      >
        <DialogTitle>
          Generated README Preview
          <Tooltip title="Copy Markdown">
            <IconButton 
              onClick={handleCopyContent}
              sx={{ float: 'right', color: mode === 'dark' ? '#90caf9' : '#1976d2' }}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent && (
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
              {selectedContent}
            </ReactMarkdown>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* History Table */}
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>Date</TableCell>
              <TableCell sx={headerCellStyle}>Repo URL</TableCell>
              <TableCell sx={headerCellStyle}>Options</TableCell>
              <TableCell sx={headerCellStyle}>Time Taken</TableCell>
              <TableCell sx={headerCellStyle}>Cost</TableCell>
              <TableCell sx={headerCellStyle}>Preview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell sx={tableCellStyle}>{entry.date}</TableCell>
                <TableCell sx={tableCellStyle}>
                  <a 
                    href={entry.repoURL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: mode === 'dark' ? '#90caf9' : '#1976d2' }}
                  >
                    {entry.repoURL}
                  </a>
                </TableCell>
                <TableCell sx={tableCellStyle}>
                  {entry.options.length ? entry.options.join(', ') : 'None'}
                </TableCell>
                <TableCell sx={tableCellStyle}>{entry.timeTaken}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.cost}</TableCell>
                <TableCell sx={tableCellStyle}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      //console.log(entry)
                       handlePreviewOpen(entry.content)
                    }}
                  >
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default History;