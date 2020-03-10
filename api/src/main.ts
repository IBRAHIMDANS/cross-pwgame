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
let players = [];

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cacheControl({ noCache: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', route);
app.use(['/api'], route);
io.on('connection', (socket) => {
    console.log(socket);
    console.log("new connection");
    socket.emit("event::hello");

    socket.on("event::initialize", payload => {
        if (players.length >= 2) {
            socket.emit("event::gameFull");
            return;
        }

        players.push(payload);
        console.log("new player 🔥 name : ", payload.nickname);

        if (players.length === 2) {
            io.emit("event::gameStart");
        }
    });

});
server.listen(port, () => {
    console.log(
        `server started at  ${process.env.HOST + ':' + port ||
        `http://localhost:${port}`}/api`,
    );
});
export default app;
