import { Router } from 'express';
import authRouter from '../modules/auth/routes/auth.routes';
import userRouter from '../modules/user/routes/user.routes';
import warehouseRouter from '../modules/warehouse/routes/warehouse.routes';
import companyRouter from '../modules/company/routes/company.route';


const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/warehouse', warehouseRouter);
apiRouter.use('/company', companyRouter);


export default apiRouter;
