import { Router } from 'express';
import AuthController from '../controllers/authController';
import requestValidator from '../middlewares/requestValidator';
import { SignUpDto } from '../dto/authDto';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', requestValidator(SignUpDto), authController.signUp);

export default authRouter;
