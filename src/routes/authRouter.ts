import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/v1/auth/signup', authController.signUp);

export default authRouter;
