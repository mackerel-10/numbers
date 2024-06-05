import { Router } from 'express';
import AuthController from '../controllers/authController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { SignUpDto } from '../dto/authDto';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/v1/auth/signup',
  validationMiddleware(SignUpDto),
  authController.signUp
);

export default authRouter;
