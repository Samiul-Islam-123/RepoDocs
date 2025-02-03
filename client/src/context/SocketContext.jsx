import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from "js-cookie"
import axios from 'axios';

// Replace with your server URL
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

// Create the context
const SocketContext = createContext();

// Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [bolts, setBolts] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(0);
  const [history, setHistory] = useState();

  const fetchHistory = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const formattedHistory = response.data.history.map(entry => ({
          date: new Date(entry.timestamp).toLocaleString(), // Convert to readable date
          repoURL: entry.repoURL,
          options: JSON.parse(entry.configuration)?.selectedOptions || [], // Extract options
          timeTaken: `${(entry.timeTaken / 1000).toFixed(2)}s`, // Convert ms to seconds
          cost: `${(entry.boltsCharged).toFixed(2)} bolts` // Adjust based on real pricing
        }));

        setHistory(formattedHistory);
        setTotalGenerations(formattedHistory.length)
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    // Initialize the socket connection with the JWT token
    
    fetchHistory();
    const token = Cookies.get('token');
    const newSocket = io(SOCKET_SERVER_URL, {
      auth: { token },
    });

    // Set the socket instance in state
    setSocket(newSocket);
    setConnected(true);



    // Cleanup the socket connection on unmount
    return () => {
      newSocket.disconnect();
      setConnected(false)
    };
  }, []);

  // useEffect(() => {
  //   setTotalGenerations(history.length)
  //   console.log(history)
  // },[history])

  return (
    <SocketContext.Provider value={{socket, connected, bolts,setBolts, totalGenerations, setTotalGenerations, history, setHistory}}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the Socket Context
export const useSocket = () => {
  return useContext(SocketContext);
};
