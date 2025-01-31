import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from "js-cookie"

// Replace with your server URL
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

// Create the context
const SocketContext = createContext();

// Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    // Initialize the socket connection with the JWT token
    
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

  return (
    <SocketContext.Provider value={{socket, connected}}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the Socket Context
export const useSocket = () => {
  return useContext(SocketContext);
};
