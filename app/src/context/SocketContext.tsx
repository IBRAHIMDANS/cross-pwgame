import React, { createContext } from 'react';
import socketIO from 'socket.io-client';

const io = socketIO('http://localhost:8080');
export const SocketContext = createContext(io);

const Provider = ({ children }) => (
    <SocketContext.Provider value={io}>
        {children}
    </SocketContext.Provider>
);
export default Provider;
