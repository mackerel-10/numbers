import { createMockObjects, mockUser } from '../mockData';
import validationMiddleWare from '../../src/middlewares/validationMiddleware';
import { SignUpDto } from '../../src/dto/authDto';
import httpStatus from 'http-status';

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
