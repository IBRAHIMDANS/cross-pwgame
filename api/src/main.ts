import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import route from './routes';
import { createServer, Server } from 'http';
import socketIO from 'socket.io';
import getNumber from './games/magicNumber';
import { addPlayer, addPoint, getPlayer, setPlayers } from './player';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as gamesJson from '../games';
import moment from 'moment';
import * as fs from 'fs';
import chalk from 'chalk';

config(); // init dotEnv

const app: Express.Express = Express();
export const server: Server = createServer(app);
const io = socketIO(server);
export const port = process.env.PORT || 8082;
let magicNumber: number = getNumber();
let beg: string;

app.get('/', route);
app.use(['/api'], route);
io.on('connection', (socket: any) => {
    console.log('new connection', socket.id);
    socket.on('event::initialize', (payload: { name: any }) => {
        socket.nameUser = payload.name;
        addPlayer(socket.id, socket.nameUser, 0);
        if (getPlayer().length == 1) {
            io.to(socket.id).emit('event::gameStart', {
                start: false,
                waiting: true,
                full: false,
            });
            return;
        }
        if (getPlayer().length === 2) {
            io.emit('event::gameStart', {
                start: true,
                waiting: false,
                full: false,
            });
            beg = moment().format();
        }
        if (getPlayer().length > 2) {
            io.to(socket.id).emit('event::gameStart', {
                start: false,
                waiting: false,
                full: true,
            });
        }
    });

    socket.on('event::checkNumber', (payload: { number: number }) => {
        const number: number = payload.number as number;
        console.log('joueur', socket.nameUser, number);
        switch (true) {
            case magicNumber > number:
                io.to(socket.id).emit('event::sendResponse', {
                    status: false,
                    response: 'Trop Petit',
                });
                break;
            case magicNumber < number:
                io.to(socket.id).emit('event::sendResponse', {
                    status: false,
                    response: 'Trop grand',
                });
                break;
            case magicNumber == number:
                io.to(socket.id).emit('event::sendResponse', {
                    status: true,
                    response: 'Félicitations tu as gagné',
                });
                addPoint(socket.nameUser as string);
                socket.broadcast.emit('event::resetGame', { status: true });
                magicNumber = getNumber();
                console.log(chalk.magenta('new magic Number', magicNumber));
                getPlayer().map(player => {
                    if (player.points === 3) {
                        socket.broadcast.emit('event::endGame', {
                            status: true,
                            response: `${player.name}  a gagné le jeu`,
                        });
                        const nGJSON = gamesJson.magicNumber.push({
                            beg: beg,
                            end: moment().format(),
                            players: [getPlayer()],
                        });
                        console.log(nGJSON);
                        fs.writeFile('../games.json', nGJSON, err => {
                            if (err) console.log(chalk.red(err));
                        });
                    }
                });
                break;
            default:
                io.to(socket.id).emit('event::sendResponse', {
                    status: false,
                    response: 'ohohoh failed',
                });
                break;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected ');
        const filteredPlayer = getPlayer().filter(
            item => item.name != socket.nameUser,
        );
        setPlayers(filteredPlayer);
        socket.broadcast.emit('event::disconnect', 'user disconnected');
    });
});

server.listen(port, () => {
    console.log(
        chalk.blue(
            `server started at  ${process.env.HOST + ':' + port ||
                `http://localhost:${port}`}/api`,
        ),
    );
    console.log(chalk.magenta('new magic Number', magicNumber));
});
export default app;
