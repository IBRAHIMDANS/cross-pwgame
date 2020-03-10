import React, { useState } from 'react';
import { AppBar, Button, TextField, Toolbar, Typography } from '@material-ui/core';

const AskNickname = ({ io }) => {
    const [nickname, setNickname] = useState('');

    const handleNickname = event => {
        setNickname(event.target.value);
    };

    const sendNickname = () => {
        io.emit('event::initialize', { nickname });
    };

    return (
        <>
            <TextField
                required
                id="filled-required"
                label="username"
                variant="filled"
                onChange={handleNickname} value={nickname}
            />
            <div className="app-btn">
                <Button variant="contained" color="primary" onClick={sendNickname} disabled={nickname === ''}>
                    Login 😀
                </Button>
            </div>
        </>
    );
};

export default AskNickname;
// "rsc"
