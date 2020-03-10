import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const AskNickname = ({ io }) => {
    const [name, setName] = useState('');

    const handleName = event => {
        setName(event.target.value);
    };

    const sendName = () => {
        io.emit('event::initialize', { name });
    };

    return (
        <>
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
        </>
    );
};

export default AskNickname;
// "rsc"
