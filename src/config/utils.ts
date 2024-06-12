import { NODE_ENV } from './config';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function configureEnvFile() {
  switch (NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'development':
      return '.env.dev';
    case 'test':
      return '.env.test';
    default:
      return '.env';
  }
}

/**
 * Validate DTO and configuration file
 *
 * Returns [] if no error, but error occurs it returns array of error messages
 * @param dataType
 * @param data
 */
export async function configValidator<T extends object>(
  dataType: new () => T,
  data: object
) {
  const mappedData = plainToInstance(dataType, data);

  return await validate(mappedData);
}
