import { Router } from 'express';
import userController from '../controllers/user.controller';
import { getUserInfoSchema } from '../schemas/user.schema';
import { authenticate, validateSchema } from '../../../middlewares';

const userRouter = Router();

userRouter.get('/profile/:userId', validateSchema(getUserInfoSchema), userController.getUserInfo);

export default userRouter;
