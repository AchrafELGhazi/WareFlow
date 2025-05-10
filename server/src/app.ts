import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import apiRouter from './routes';
import { apiRateLimiter } from './middlewares/rate-limiter.middleware';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', apiRateLimiter);

app.use('/api', apiRouter);

export default app;
