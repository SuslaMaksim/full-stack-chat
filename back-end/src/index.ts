import express from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http';

dotenv.config();

import createRoutes from './core/routes';
import createSocket from './core/socket';
import './core/db';


const app  = express();
const http = createServer(app);
const io = createSocket(http);



createRoutes(app, io);

http.listen(process.env.PORT, () => {
    console.log(`Server: http://localhost:${process.env.PORT}`)
})