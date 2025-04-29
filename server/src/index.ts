import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  logger.info(`Server running in ${config.env} at ${config.host}:${config.port}`);
});

export default app;
