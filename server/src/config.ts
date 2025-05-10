import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV;

const config = {
  env: ENV,
  isDev: ENV === 'development',
  isProd: ENV === 'production',
  port: process.env.PORT,
  host:
    ENV === 'development'
      ? 'http://localhost'
      : process.env.PROD_URL || 'https://api.wareflow.com',
};

export default config;
