import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import AskNickname from './components/AskNickname';
import MagicNumber from './components/MagicNumber';
import './App.css';
import { Box } from '@material-ui/core';
import ToolBar from './components/Toolbar';

const io = socketIO('http://localhost:8080');

function App() {
    const [isGameStarted, setGameStarted] = useState(false);
    const [wait, setWait] = useState();
    useEffect(() => {
        io.on('event::gameStart', (data) => {
            console.log('game started');
            setGameStarted(true);
        });
    }, []);


    const switchComponent = () => {
        if (isGameStarted) {
            return <AskNickname io={io}/>;
        } else {
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
