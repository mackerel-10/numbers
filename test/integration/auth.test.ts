import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { mockUser } from '../mockData';
import logger from '../../src/config/logger';
import User from '../../src/database/User';
import DatabaseModel from '../../src/database/DatabaseModel';

describe('POST /auth/signup API Test', () => {
  afterAll(async () => {
    // delete the user from the database
    const db = await DatabaseModel.getInstance();
    await db.appDataSource.manager.clear(User);
  });
  test('User inserted', async () => {
    try {
      // Insert user
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(mockUser.validRequest);
      expect(response.statusCode).toBe(httpStatus.CREATED);

      // Check if the user is saved in the database
      logger.debug('Loading users from the database...');
      const db = await DatabaseModel.getInstance();
      const user = await db.isUserExists(mockUser.validRequest.email);
      logger.debug('Loaded users: ', JSON.stringify(user));
      expect(user).toBeTruthy();
    } catch (error) {
      expect(error).toMatch('error');
    }
  });

  test('Check if the user exists', async () => {
    // Check if the user is saved in the database
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.validRequest);

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });
});
