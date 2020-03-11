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
import { addPlayer, addPoint, players } from './player';

config(); // init dotEnv

const app: Express.Express = Express();
export let server: Server = createServer(app);
const io = socketIO(server);
export const port = process.env.PORT || 8082;
const magicNumber: number = getNumber();


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
        if (players.length == 1) {
            io.emit('event::gameStart',{ start: false, waiting: true, full: false });
            return;
        }
        if (players.length === 2) {
            io.emit('event::gameStart', { start: true, waiting: false, full: false });
        }
        if (players.length > 2) {
            io.emit('event::gameStart',{ start: false, waiting: false, full: true });
        }
    });

    socket.on('event::checkNumber', payload => {
        const number: number = payload.number as number;
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
                break;
            default:
                io.to(socket.id).emit('event::sendResponse', { status: true, response: 'ohohoh failed' });
                break;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected ');
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
