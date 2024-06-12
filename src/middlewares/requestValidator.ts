import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { configValidator } from '../config/utils';

function requestValidator<T extends object>(
  dto: new () => T
): (request: Request, response: Response, next: NextFunction) => Promise<void> {
  return async (request: Request, response: Response, next: NextFunction) => {
    const error = await configValidator(dto, request.body);
    if (error.length > 0) {
      const errorMessages = error.flatMap((error: ValidationError) =>
        Object.values(error.constraints || {})
      );
      response.status(httpStatus.BAD_REQUEST).json({ error: errorMessages });
      next(error);
    }
    next();
  };
}

export default requestValidator;
