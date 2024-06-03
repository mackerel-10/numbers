import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import signUpDto from '../src/dto/auth/signUpDto';
import validationMiddleWare from '../src/middlewares/validationMiddleWare';

function createMockObjects<T>(mockData: T) {
  const mockRequest = {
    body: mockData,
  } as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext: NextFunction = jest.fn();

  return { mockRequest, mockResponse, mockNext };
}

const mockUser = {
  validRequest: {
    email: 'test@test.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
  },
  badRequest: {
    email: 'test@test.com',
    password: 'password',
    firstName: 'John',
  },
};

describe('Validation Middleware Test', () => {
  test('Test valid request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.validRequest
    );

    await validationMiddleWare(signUpDto)(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).not.toHaveBeenCalledWith(
      httpStatus.BAD_REQUEST
    );
  });

  test('Test bad request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.badRequest
    );

    await validationMiddleWare(signUpDto)(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
  });
});

describe('/auth User API Test', () => {
  test('POST /auth/signup User signup test', async () => {
    try {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(mockUser);

      expect(response.statusCode).toBe(httpStatus.CREATED);
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
