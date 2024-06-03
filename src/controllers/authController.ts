import httpStatus from 'http-status';
import { Request, Response } from 'express';

class AuthController {
  async signUp(req: Request, res: Response) {
    // TODO Add request validation here
    const { email, password, firstName, lastName } = req.body;

    // TODO your signup logic
    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully',
      user: {
        email,
        firstName,
        lastName,
      },
    });
  }
}

export default AuthController;
