import React from 'react';
import AskNickname from './components/AskNickname';
import './App.css';
import MagicNumber from './components/MagicNumber';
import Provider  from './context/SocketContext';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import WaitingPlayer from './components/waitingPlayer';
import ListGames from './components/ListGames';

// const io = socketIO('http://localhost:8080');

function App() {
    // const [isGameStatus, setGameStatus] = useState<GameStatus>({ start: false, waiting: false, full: false });
    //
    // useEffect(() => {
    //     io.on('event::gameStart', (data: GameStatus) => {
    //         console.log('game started');
    //         console.log(data);
    //         setGameStatus({ start: data.start, waiting: data.waiting, full: data.full });
    //     });
    // }, []);


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
    // const socketContextValue = {
    //     io
    // };
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
                {/*<Box color="text.primary" className="app-container">*/}
                {/*    {switchComponent()}*/}
                {/*</Box>*/}
            </Provider>
        </>
    );
}

export default App;
