import 'module-alias/register';
import http from 'http';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import logger from '@logger';
import apiRoutes from './routes';

// Load env vars
dotenv.config();

// Initial app
const app: Application = express();

// Initial port
const PORT: number = parseInt(process.env.PORT || '9000', 10);

// API logger
// API logger
if (process.env.NODE_ENV === 'development') {
    const myFormat = '[:date[clf]] ":method :url" :status :res[content-length] - :response-time ms';
    app.use(morgan(myFormat));
}

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mount api routes
app.use('/api/v1', apiRoutes);

app.use((req, res, next) => {
    console.log("----------------------------------------")
    next(new Error('Something went wrong'));
  });

// Create server and listen
http
    .createServer(app)
    .listen(PORT, () => logger.info(`Application running on port:${PORT}`));
