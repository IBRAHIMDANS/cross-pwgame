import Player from '../model/Player';
import { createContext } from "react";

type SocketContextProps = {
    io: SocketIOClient.Socket;
    player: Player;
}

export const SocketContext = createContext<Partial<SocketContextProps>>({});
