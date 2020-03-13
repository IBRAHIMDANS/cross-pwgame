import React from 'react';
import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ListGames = () => {
    const [games, setGames] = React.useState('');
    const handleChange = event => {
        setGames(event.target.value);
    };
    const history = useHistory();
    const goToGames = () => {
        return history.push(`/${games}`);
    };
    return (
        <div className="app-box">
            <FormControl className="app-select">
                <Select
                    labelId="games"
                    id="games"
                    value={games}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem disabled={true} value="">
                        Select Games
                    </MenuItem>
                    <MenuItem value='magicNumber'>Magic Number </MenuItem>
                    <MenuItem value='quickWord' disabled={true}>QuickWord</MenuItem>
                    <MenuItem value='wordAndFurious' disabled={true}>WordAndFurious</MenuItem>
                </Select>
            </FormControl>
            <div style={{marginTop : '1em'}}>

                <Button variant="contained" color="primary" onClick={goToGames}>
                    Validate
                </Button>
            </div>

        </div>
    );
};

export default ListGames;
