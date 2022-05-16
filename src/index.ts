import express, {Express, Request, Response, NextFunction} from 'express';
import {Greeter} from './greeter'

const app: Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    const p1 = req.query['p1']?.toString()??'world';
    const g = new Greeter(p1);

    res.send(g.greet() + ' <br\>Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});