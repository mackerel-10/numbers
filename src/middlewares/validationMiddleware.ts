import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

function validationMiddleware<T extends object>(
  type: new () => T
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(type, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const errorMessages = errors.flatMap((error: ValidationError) =>
          Object.values(error.constraints || {})
        );
        res.status(httpStatus.BAD_REQUEST).json({ errors: errorMessages });
        throw new Error('Validation failed');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default validationMiddleware;
