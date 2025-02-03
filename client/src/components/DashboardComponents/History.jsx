import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import axios from "axios";
import Cookies from "js-cookie";
import { useSocket } from '../../context/SocketContext';

function History() {
  const {history, setHistory} = useSocket();
  const {setTotalGenerations} = useSocket();

  // const fetchHistory = async () => {
  //   try {
  //     const token = Cookies.get('token');
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/`, {
  //       headers: {
  //         'authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (response.data.success) {
  //       const formattedHistory = response.data.history.map(entry => ({
  //         date: new Date(entry.timestamp).toLocaleString(), // Convert to readable date
  //         repoURL: entry.repoURL,
  //         options: JSON.parse(entry.configuration)?.selectedOptions || [], // Extract options
  //         timeTaken: `${(entry.timeTaken / 1000).toFixed(2)}s`, // Convert ms to seconds
  //         cost: `${(entry.boltsCharged).toFixed(2)} bolts` // Adjust based on real pricing
  //       }));

  //       setHistory(formattedHistory);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching history:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchHistory();
  // }, []);

//  useEffect(() => {
//     setTotalGenerations(history.length)
//     console.log(history)
//   },[history]) 

  const { mode } = useThemeContext();

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
                <TableCell sx={tableCellStyle}>
                  <a href={entry.repoURL} target="_blank" rel="noopener noreferrer" style={{ color: mode === 'dark' ? '#90caf9' : '#1976d2' }}>
                    {entry.repoURL}
                  </a>
                </TableCell>
                <TableCell sx={tableCellStyle}>{entry.options.length ? entry.options.join(', ') : 'None'}</TableCell>
                <TableCell sx={tableCellStyle}>{entry.timeTaken}</TableCell>
                {console.log(entry)}
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
