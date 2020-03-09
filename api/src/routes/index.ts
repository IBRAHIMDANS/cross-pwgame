import Express, { Router } from 'express';
const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({ status: 'ok' });
});
export default api;
