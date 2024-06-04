import httpStatus from 'http-status';
import { Request, Response } from 'express';

class AuthController {
  async signUp(req: Request, res: Response) {
    // TODO Get password from req.body
    const { email, firstName, lastName } = req.body;

    // TODO Signup logic
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
