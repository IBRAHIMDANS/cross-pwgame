import React, { useContext, useEffect, useState } from 'react';
import useReload from '../hooks/useReload';
import { SocketContext } from '../context/SocketContext';
import { Box, Typography } from '@material-ui/core';
import Player from '../model/Player';

const DashBoard = () => {
    const io = useContext(SocketContext);
    const [player, setPlayer] = useState<Player[]>();
    useReload(io);
    useEffect(() => {
        io.on('event::Score', (res: Player []) => {
            setPlayer(res);
        });
    }, [io]);
    return (
        <Box>
            <div>
                <Typography variant="subtitle1" align="center" noWrap> {player ? 'Score' : ''} </Typography>
                <Typography variant="subtitle2" align='center'
                            noWrap> {player ? `${player[0].name}  ${player[0].points} - ${player[1].points}  ${player[1].name}` : ''} </Typography>
            </div>
        </Box>
    );
};

export default DashBoard;
