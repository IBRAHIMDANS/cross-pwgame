import React from 'react';
import AskNickname from './components/AskNickname';
import './App.css';
import MagicNumber from './components/MagicNumber';
import Provider from './context/SocketContext';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import WaitingPlayer from './components/waitingPlayer';
import ListGames from './components/ListGames';

function App() {
    return (
        <>
            <Provider>
                <Router>
                    <Switch>
                        <Route exact path='/(|login)/' component={AskNickname}/>
                        <Route exact path='/MagicNumber' component={MagicNumber}/>
                        <Route exact path='/ListGames' component={ListGames}/>
                        <Route exact path='/wait' component={WaitingPlayer}/>
                    </Switch>
                </Router>
            </Provider>
        </>
    );
}

export default App;
