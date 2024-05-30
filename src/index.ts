import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { connectDB } from './db';

import routes from './routes';

const app = express();
app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8004, async () => {
    console.log("Server listening on port 8004");
    await connectDB();
});


app.use('/', routes());