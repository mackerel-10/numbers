import '../../src/config/config';
import httpStatus from 'http-status';
import { createMockObjects, mockUser } from '../mockData';
import requestValidator from '../../src/middlewares/requestValidator';
import { SignUpDto } from '../../src/dto/authDto';

describe('Request Validator', () => {
  test('Test valid request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.validRequest
    );

    await requestValidator(SignUpDto)(mockRequest, mockResponse, mockNext);
    console.log(mockResponse.status);
    expect(mockResponse.status).not.toEqual(httpStatus.BAD_REQUEST);
  });

  test('Test bad request', async () => {
    const { mockRequest, mockResponse, mockNext } = createMockObjects(
      mockUser.badRequest
    );

    await requestValidator(SignUpDto)(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toEqual(httpStatus.BAD_REQUEST);
  });
});
