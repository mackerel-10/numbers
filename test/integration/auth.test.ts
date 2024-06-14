import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { mockUser } from '../mockData';
import logger from '../../src/config/logger';
import User from '../../src/database/User';
import DatabaseModel from '../../src/database/DatabaseModel';

describe('POST /auth/signup API Test', () => {
  let db: DatabaseModel;
  beforeAll(async () => {
    db = await DatabaseModel.getInstance();
  });

  afterAll(async () => {
    // Truncate the User table after the test
    await db.truncateTable(User);
    // Close the connection
    await db.appDataSource.destroy();
  });

  test('Test API', async () => {
    // Insert user
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.validRequest);

    expect(response.statusCode).toBe(httpStatus.CREATED);
    logger.debug(`Response: ${JSON.stringify(response.body)}`);
  });

  test('Test if the user exists', async () => {
    // Check if the user is saved in the database
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser.validRequest);

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });
});
