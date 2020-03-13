import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
import route from './routes';
import cors from 'cors';
import cacheControl from 'express-cache-controller';
import { createServer, Server } from 'http';
import helmet from 'helmet';
import socketIO from 'socket.io';
import getNumber from './games/magicNumber';
import { addPlayer, addPoint, getPlayer, setPlayers } from './player';
// @ts-ignore
import * as gamesJson from "../games";
import moment from 'moment';
import * as fs from 'fs';

config(); // init dotEnv

const app: Express.Express = Express();
export let server: Server = createServer(app);
const io = socketIO(server);
export const port = process.env.PORT || 8082;
let magicNumber: number = getNumber();
let beg: string;


app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cacheControl({ noCache: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', route);
app.use(['/api'], route);
io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('event::initialize', payload => {
        socket.nameUser = payload.name;
        addPlayer(socket.id, socket.nameUser, 0);
        if (getPlayer().length == 1) {
            io.to(socket.id).emit('event::gameStart', { start: false, waiting: true, full: false });
            return;
        }
        if (getPlayer().length === 2) {
            io.emit('event::gameStart', { start: true, waiting: false, full: false });
            beg = moment().format()
        }
        if (getPlayer().length > 2) {
            io.to(socket.id).emit('event::gameStart', { start: false, waiting: false, full: true });
        }
    });

    socket.on('event::checkNumber', payload => {
        let number: number = payload.number as number;
        console.log('joueur', socket.nameUser, number);
        switch (true) {
            case (magicNumber > number) :
                io.to(socket.id).emit('event::sendResponse', { status: false, response: 'Trop Petit' });
                break;
            case magicNumber < number:
                io.to(socket.id).emit('event::sendResponse', { status: false, response: 'Trop grand' });
                break;
            case magicNumber == number:
                io.to(socket.id).emit('event::sendResponse', { status: true, response: 'Félicitations tu as gagné' });
                addPoint((socket.nameUser as string));
                socket.broadcast.emit('event::resetGame', { status: true });
                magicNumber = getNumber();
                console.log(magicNumber);
                getPlayer().map(player => {
                    if (player.points === 3) {
                        socket.broadcast.emit('event::endGame', {
                            status: true,
                            response: `${player.name}  a gagné le jeu`
                        });
                        gamesJson.magicNumber.push({
                            "beg": beg,
                            "end" : moment().format(),
                            "players" :  [getPlayer()]
                        })
                        console.log(gamesJson);
                        fs.writeFileSync("../games",gamesJson)
                    }
                });
                break;
            default:
                io.to(socket.id).emit('event::sendResponse', { status: false, response: 'ohohoh failed' });
                break;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected ');
        let filteredPlayer = getPlayer().filter(item => item.name != socket.nameUser);
        setPlayers(filteredPlayer);
        socket.broadcast.emit('event::disconnect', 'user disconnected');
    });

});

server.listen(port, () => {
    console.log(
        `server started at  ${process.env.HOST + ':' + port ||
        `http://localhost:${port}`}/api`,
    );
    console.log('magic Number', magicNumber);
});
export default app;
