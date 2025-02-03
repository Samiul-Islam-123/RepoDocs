import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import axios from "axios"
import Cookies from "js-cookie"

function History() {
  // Sample history data (this can be fetched from an API or stored in state)
  const [history, setHistory] = useState([
    {
      date: '2025-01-25 14:30',
      repoURL: 'https://github.com/user/project1',
      options: ['installation', 'usage'],
      timeTaken: '2s',
      cost: '$0.00'
    },
    {
      date: '2025-01-24 16:45',
      repoURL: 'https://github.com/user/project2',
      options: ['contributing', 'license'],
      timeTaken: '3s',
      cost: '$0.00'
    },
    // More history entries...
  ]);

  const fetchHistory = async() => {
    const token = Cookies.get('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/`,{
        headers: {
          'authorization': `Bearer ${token}`
        }
      })

      console.log(response)
  }

  useEffect(() => {
    fetchHistory()
  },[])

  const { mode } = useThemeContext();

  // Define styles based on theme mode
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

      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>Date</TableCell>
              <TableCell sx={headerCellStyle}>Repo URL</TableCell>
              <TableCell sx={headerCellStyle}>Options</TableCell>
              <TableCell sx={headerCellStyle}>Time Taken</TableCell>
              <TableCell sx={headerCellStyle}>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell sx={tableCellStyle}>{entry.date}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.repoURL}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.options.join(', ')}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.timeTaken}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default History;
