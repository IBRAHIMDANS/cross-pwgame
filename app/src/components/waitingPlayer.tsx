import React, { useContext } from 'react';
import useReload from '../hooks/useReload';
import { SocketContext } from '../context/SocketContext';
import Loader from 'react-loader-spinner';
import { Box, Typography } from '@material-ui/core';

const WaitingPlayer = () => {
    const io = useContext(SocketContext);
    useReload(io);
    return (
        <Box color="text.primary" className="app-box">
            <div className="app-text">
                <Typography variant="h5" noWrap> Waiting second Player </Typography>
            </div>
            <Loader
                type="CradleLoader"
                color="Black"
                height={100}
                width={100}
                timeout={0}
            />
        </Box>
    );
};

export default WaitingPlayer;
