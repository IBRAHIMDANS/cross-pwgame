import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';

const ToolBar = () => {


    return (
        <>
            <div className="toolbar" style={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}>
                <Toolbar>
                    <Typography className="app-title" variant="h5" noWrap>
                        Magic Number
                    </Typography>
                </Toolbar>
            </div>
        </>
    );
};

export default ToolBar;
// "rsc"
