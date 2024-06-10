import httpStatus from 'http-status';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/config';
import logger from '../config/logger';
import DatabaseModel from '../database/databaseModel';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Auto generate salt and hash
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // const db = await DatabaseModel.getDbInstance();
      // db.insertUser(email, hashedPassword, firstName, lastName);

      logger.debug('User created successfully');
      return res.status(httpStatus.CREATED).json({
        message: 'User created successfully',
        user: {
          email,
          firstName,
          lastName,
        },
      });
    } catch (error) {
      logger.error('User creation failed', error);
    }
  }
}

export default AuthController;
