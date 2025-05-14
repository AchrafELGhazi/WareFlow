import { Router } from 'express';
import authRouter from '../modules/auth/routes/auth.routes';
import userRouter from '../modules/user/routes/user.routes';


const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
