import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Chip, TextField } from '@material-ui/core';
import ToolBar from './Toolbar';
import { SocketContext } from '../context/SocketContext';
import DashBoard from './Dashboard';

const MagicNumber = () => {
    const io = useContext(SocketContext);

    const [number, setNumber] = useState('');
    const [response, setResponse] = useState();
    const handleNumber = event => {
        setNumber(event.target.value);
    };
    useEffect(() => {
        io.on('event::sendResponse', (data) => {
            setResponse(data);
        });
    }, [io]);
    useEffect(() => {
        io.on('event::resetGame', () => {
            setNumber('');
            setResponse('');
        });
    }, [io]);
    const sendNumber = () => {
        io.emit('event::checkNumber', { number });
    };
    const resetGame = () => {
        io.emit('event::resetGame', {});
        setNumber('');
        setResponse(undefined)
    };
    return (
        <>
            <ToolBar/>
            <Box color="text.primary" className="app-container">
                <DashBoard/>
                <TextField
                    required
                    id="filled-required"
                    label="please enter your number"
                    type="number"
                    variant="filled"
                    onChange={handleNumber} value={number}
                />
                {response ? <div className="app-chip">
                        <Chip
                            variant="outlined"
                            size="small"
                            label={response.response}
                            color={response.status === true ? 'primary' : 'secondary'}
                        /></div>
                    : <span/>
                }
                <div className="app-btn">
                    {
                        response?.status !== true ?
                            <Button variant="contained" color="primary" onClick={sendNumber} disabled={number === ''}>
                                check
                            </Button> :
                            <Button variant="contained" color="primary" onClick={resetGame} disabled={number === ''}>
                                Rejouer
                            </Button>
                    }
                </div>
            </Box>
        </>
    );
};

export default MagicNumber;
