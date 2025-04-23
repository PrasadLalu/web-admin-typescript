import 'module-alias/register';
import http from 'http';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import apiRoutes from './routes';
import logger from '@logger';

// Load env vars
dotenv.config();

// Initial app
const app: Express = express();

// Initial port
const PORT: number = 9000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount api routes
app.use('/api/v1', apiRoutes);

// Create server and listen to server
const server = http.createServer(app);
server.listen(PORT, () => {
    logger.info(`Server running on port: ${PORT}`);
});