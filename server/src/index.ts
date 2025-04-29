import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
(async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Johns Doe',
      email: 'joffsf',
    },
  });
  console.log(user);
})();

});

export default app;