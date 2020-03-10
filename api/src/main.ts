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

config(); // init dotEnv

const app: Express.Express = Express();
export let server: Server = createServer(app);
const io = socketIO(server);
export const port = process.env.PORT || 8082;
const min = 0;
const max = 1337;
const magicNumber: number = min + Math.round(Math.random() * (max - min));
let players: Player[] = [];

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cacheControl({ noCache: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', route);
app.use(['/api'], route);

io.on('connection', (socket) => {
    console.log('new connection');
    socket.emit('event::hello');

    socket.on('event::initialize', payload => {
        players.push({
            id: socket.id,
            name: payload.name,
            points: 0
        });
        console.log('new player 🔥 ', payload.name);
        socket.name = payload.name;

        if (players.length == 1) {
            io.emit('event::waitingPlayer');
            return;
        }
        if (players.length === 2) {
            io.emit('event::gameStart');
        }
        if (players.length >= 2) {
            io.emit('event::fullPlayer');
        }
    });

    socket.on('event::checkNumber', payload => {

        const number: number = payload.number as number;
        console.log(number);
        switch (true) {
            case (magicNumber > number) :
                io.to(socket.id).emit('event::sendResponse', { status: false, response: 'Trop Petit' });
                break;
            case magicNumber < number:
                io.to(socket.id).emit('event::sendResponse', { status: false, response: 'Trop grand' });
                break;
            case magicNumber == number:
                io.to(socket.id).emit('event::sendResponse', { status: true, response: 'Félicitations tu as gagné' });
                console.log(socket);
                players.map(player => {
                    if (player.name == socket.name) {
                        player.points = player.points + 1;
                    }
                });
                console.log(players);
                // players.filter( (player.id === socket.id ) => {
                //         player.score= player.score+1
                // })
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
