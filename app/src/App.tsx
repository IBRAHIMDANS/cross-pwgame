import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import AskNickname from './components/AskNickname';
import './App.css';
import { Box } from '@material-ui/core';
import ToolBar from './components/Toolbar';
import GameStatus from './model/GameStatus';
import MagicNumber from './components/MagicNumber';

const io = socketIO('http://localhost:8080');

function App() {
    const [isGameStatus, setGameStatus] = useState<GameStatus>({ start: false, waiting: false, full: false });

    useEffect(() => {
        io.on('event::gameStart', (data: GameStatus) => {
            console.log('game started');
            console.log(data);
            setGameStatus({ start: data.start, waiting: data.waiting, full: data.full });
        });
    }, []);


    const switchComponent = () => {
        if (!isGameStatus.start && !isGameStatus.waiting && !isGameStatus.full) {
            return <AskNickname io={io}/>;
        }
        if (!isGameStatus.start && isGameStatus.waiting && !isGameStatus.full) {
            return <span> wait </span>;
        }
        if (!isGameStatus.start && !isGameStatus.waiting && isGameStatus.full) {
            return <span> full </span>;
        }
        if (isGameStatus.start && !isGameStatus.waiting && !isGameStatus.full) {
            return <MagicNumber io={io}/>;
        }
    };
    return (<>
            <ToolBar/>
            <Box color="text.primary" className="app-container">
                {switchComponent()}
            </Box>
        </>
    );
}

export default App;
