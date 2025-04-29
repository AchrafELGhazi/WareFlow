import app from './app';
import logger from './config/logger';
import config from './config';

app.listen(config.port, () => {
  logger.info(
    `Server running in ${config.env} at ${config.host}:${config.port}`
  );
});
