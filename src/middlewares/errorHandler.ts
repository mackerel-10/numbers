import { Request, Response } from 'express';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response
) {
  const status = response.statusCode || 500;

  return response.status(status).json({
    message: error.message,
    stack: error.stack,
  });
}
