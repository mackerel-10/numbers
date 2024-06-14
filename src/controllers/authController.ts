import httpStatus from 'http-status';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/config';
import logger from '../config/logger';
import DatabaseModel from '../database/DatabaseModel';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, dayOfBirth } = req.body;

      // Auto generate salt and hash
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const db = await DatabaseModel.getInstance();
      const isExist = await db.isUserExists(email);
      if (isExist) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: 'User already exists',
        });
      }
      await db.insertUser({
        ...req.body,
        password: hashedPassword,
      });

      logger.debug('User created successfully');
      return res.status(httpStatus.CREATED).json({
        message: 'User created successfully',
        user: {
          email,
          firstName,
          lastName,
          dayOfBirth,
        },
      });
    } catch (error) {
      logger.error('User creation failed', error);
    }
  }
}

export default AuthController;
