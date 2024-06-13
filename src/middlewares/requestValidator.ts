import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { classMapperAndValidator } from '../config/utils';

function requestValidator<T extends object>(
  dto: new () => T
): (request: Request, response: Response, next: NextFunction) => Promise<void> {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await classMapperAndValidator(dto, request.body);
      next();
    } catch (error) {
      if (
        Array.isArray(error) &&
        error.every(
          (error: ValidationError[]) => error instanceof ValidationError
        )
      ) {
        // const errorMessages = error.flatMap((error: ValidationError) =>
        //   Object.values(error.constraints || {})
        // );
        response.status(httpStatus.BAD_REQUEST).json({ error });
        next(error);
      }
    }
  };
}

export default requestValidator;
