import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';

describe('/auth User API Test', () => {
  test('POST /auth/signup User signup test', async () => {
    try {
      const response = await request(app).post('/api/v1/auth/signup').send({
        email: 'test@test.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      });
      expect(response.statusCode).toBe(httpStatus.CREATED);
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
