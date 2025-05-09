import { Router } from 'express';
import authController from '../controllers/user.controller';
import { SignupSchema, LoginSchema } from '../schemas/user.schema';
import { UserRole } from '@prisma/client';
import { authenticate, validateSchema, verifyRole } from '../../../middlewares';

const authRouter = Router();

authRouter.post('/signup', validateSchema(SignupSchema), authController.signup);
authRouter.post('/login', validateSchema(LoginSchema), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', authenticate, authController.getCurrentUser);
authRouter.get(
  '/admin-dashboard',
  authenticate,
  verifyRole([UserRole.ADMIN]),
  (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
  }
);

export default authRouter;
