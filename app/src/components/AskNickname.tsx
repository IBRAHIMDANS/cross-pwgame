import React, { useContext, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { SocketContext } from '../context/SocketContext';
import reload from '../utils/Reload';

const AskNickname = () => {
    const [name, setName] = useState('');
    const io = useContext(SocketContext);
    const handleName = event => {
        setName(event.target.value);
    };

    const sendName = () => {
        io.emit('event::initialize', { name });
    };
    reload(io);
    // const switchComponent = () => {
    //     if (!isGameStatus.start && !isGameStatus.waiting && !isGameStatus.full) {
    //         return <AskNickname io={io}/>;
    //     }
    //     if (!isGameStatus.start && isGameStatus.waiting && !isGameStatus.full) {
    //         return <span> wait </span>;
    //     }
    //     if (!isGameStatus.start && !isGameStatus.waiting && isGameStatus.full) {
    //         return <span> full </span>;
    //     }
    //     if (isGameStatus.start && !isGameStatus.waiting && !isGameStatus.full) {
    //         return <MagicNumber io={io}/>;
    //     }
    // };
    return (
        <>
            <Box color="text.primary" className="app-container">
                <TextField
                    required
                    id="filled-required"
                    label="username"
                    variant="filled"
                    onChange={handleName} value={name}
                />
                <div className="app-btn">
                    <Button variant="contained" color="primary" onClick={sendName} disabled={name === ''}>
                        Login 😀
                    </Button>
                </div>
            </Box>
        </>
    );
};

export default AskNickname;
// "rsc"
