import { useEffect, useState } from 'react';
import GameStatus from '../model/GameStatus';
import { useHistory } from "react-router-dom";

export default  function reload(io)  {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isGameStatus, setGameStatus] = useState<GameStatus>({ start: false, waiting: false, full: false });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        io.on('event::gameStart', (data: GameStatus) => {
            console.log('game started');
            console.log(data);
            setGameStatus({ start: data.start, waiting: data.waiting, full: data.full });
        });
    }, [io]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!isGameStatus.start && isGameStatus.waiting && !isGameStatus.full) {
            return history.push('/wait')
        }
        if (isGameStatus.start && !isGameStatus.waiting && !isGameStatus.full) {
            return history.push('/ListGames')
        }
        if (!isGameStatus.start && !isGameStatus.waiting && isGameStatus.full) {
            return history.push('/')
        }
    }, [history, isGameStatus.full, isGameStatus.start, isGameStatus.waiting]);
}
