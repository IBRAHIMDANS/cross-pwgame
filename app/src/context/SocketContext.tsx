import React, { createContext } from 'react';
import socketIO from 'socket.io-client';

const io = socketIO(`${process.env.REACT_APP_SOCKET_HOST}`);
export const SocketContext = createContext(io);

const Provider = ({ children }) => (
    <SocketContext.Provider value={io}>
        {children}
    </SocketContext.Provider>
);
export default Provider;
