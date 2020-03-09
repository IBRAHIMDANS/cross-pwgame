import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
import route from './routes';
import cors from 'cors';
import cacheControl from 'express-cache-controller';
import * as http from 'http';
import helmet from 'helmet';
import { createServer } from 'http';
import socketIo from 'socket.io';

config(); // init dotEnv

const app: Express.Express = Express();
export let server = createServer(app);
const io = socketIo(server);
export const port = process.env.PORT || 8082;
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cacheControl({ noCache: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', route);
app.use(['/api'], route);
io.on('connection', () => {


})
server.listen(port, () => {
    console.log(
        `server started at  ${process.env.HOST + ':' + port ||
        `http://localhost:${port}`}/api`,
    );
});
export default app;
