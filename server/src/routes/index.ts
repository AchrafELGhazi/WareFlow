import { Router } from 'express';
import authRouter from '../modules/auth/routes/auth.routes';
import userRouter from '../modules/user/routes/user.routes';
import warehouseRouter from '../modules/warehouse/routes/warehouse.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/warehouse', warehouseRouter);

export default apiRouter;
