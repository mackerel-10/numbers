import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';
import { SignUpDto } from '../src/dto/authDto';
import validationMiddleWare from '../src/middlewares/validationMiddleware';
import { createMockObjects, mockUser } from './mockData';

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

describe('/auth User API Test', () => {
  test('POST /auth/signup User signup test', async () => {
    try {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(mockUser.validRequest);

      expect(response.statusCode).toBe(httpStatus.CREATED);
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
