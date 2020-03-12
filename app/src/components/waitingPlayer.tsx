import React, { useContext, useEffect, useState } from 'react';
import GameStatus from '../model/GameStatus';
import reload from '../utils/Reload';
import { SocketContext } from '../context/SocketContext';

const WaitingPlayer = () => {
    const io = useContext(SocketContext);
    reload(io);
    return (
        <div>
            ⛹🏿⛹🏿⛹🏿⛹🏿 wait player ⛹🏿⛹🏿⛹🏿
        </div>
    );
};

export default WaitingPlayer;
