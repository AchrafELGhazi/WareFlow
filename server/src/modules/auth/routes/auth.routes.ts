import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../../../middlewares/auth.middleware';
import { LoginDto, SignupDto } from '../dtos/auth.dto';
import { validateDto } from '../validators/auth.validator';

const authRouter = Router();

authRouter.post('/signup', validateDto(SignupDto), authController.signup);
authRouter.post('/login', validateDto(LoginDto), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get(
  '/me',
  authMiddleware.authenticate,
  authController.getCurrentUser
);

export default authRouter;
