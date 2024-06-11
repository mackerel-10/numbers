import request from 'supertest';
import httpStatus from 'http-status';
import app from '../src/app';
import { SignUpDto } from '../src/dto/authDto';
import validationMiddleWare from '../src/middlewares/validationMiddleware';
import { createMockObjects, mockUser } from './mockData';
import logger from '../src/config/logger';
import User from '../src/database/User';
import DatabaseModel from '../src/database/databaseModel';

describe('Validation Middleware Test', () => {
  test('Test valid request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.validRequest
    );

    await validationMiddleWare(SignUpDto)(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).not.toHaveBeenCalledWith(
      httpStatus.BAD_REQUEST
    );
  });

  test('Test bad request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.badRequest
    );

    await validationMiddleWare(SignUpDto)(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });
});

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
