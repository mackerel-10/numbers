import { NextFunction, Request, Response } from 'express';

export function createMockObjects<T>(mockData: T) {
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

export const mockUser = {
  validRequest: {
    email: 'test@test.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    dayOfBirth: '2001-01-01',
  },
  badRequest: {
    email: 'test@test.com',
    password: 'password',
    firstName: 'John',
    dayOfBirth: '2001-01-01',
  },
};
