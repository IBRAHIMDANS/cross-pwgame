import React, { useContext, useEffect } from 'react';
import useReload from '../hooks/useReload';
import { SocketContext } from '../context/SocketContext';
import { Box, Typography } from '@material-ui/core';

const DashBoard = () => {
    const io = useContext(SocketContext);
    useReload(io);
    useEffect(() => {
        io.on('event::Score', (res) => {
            console.log(res);
        });
    }, [io]);
    return (
        <Box color="text.primary" className="app-box">
            <div className="app-text">
                <Typography variant="h5" noWrap> Player: </Typography>
            </div>
        </Box>
    );
};

export default DashBoard;
