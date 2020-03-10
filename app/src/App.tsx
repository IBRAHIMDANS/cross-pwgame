import React, { useState } from 'react';
import socketIO from 'socket.io-client';
import AskNickname from './components/AskNickname';
import MagicNumber from './components/MagicNumber';
import './App.css';
import { Box, Button, TextField } from '@material-ui/core';
import ToolBar from './components/Toolbar';

function App() {
    const [isGameStarted, setGameStarted] = useState(false);
    const io = socketIO('http://localhost:8080');

    // io.on('event::hello', () => {
    //     console.log('handshake');
    // });

    io.on('event::gameStart', () => {
        console.log('game started');
        setGameStarted(true);
    });
    return (<>
            <ToolBar/>
            <Box color="text.primary" className="app-container">
                {!isGameStarted ? <AskNickname io={io}/> : <MagicNumber io={io}/>}
            </Box>
        </>
    );
}

export default App;
