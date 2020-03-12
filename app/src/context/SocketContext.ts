import Player from '../model/Player';
import { createContext } from 'react';

type SocketContextProps = {
    io: any;
    player?: Player;
}

const SocketContext = createContext<SocketContextProps>({ io: '', player: undefined });
export default SocketContext;
