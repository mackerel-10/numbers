import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NODE_ENV } from './config';

export function configureEnvFile() {
  if (NODE_ENV === 'production') return '.env.prod';
  else if (NODE_ENV === 'development') return '.env.dev';
  else if (NODE_ENV === 'test') return '.env.test';
  return '.env';
}

/**
 * Validate DTO and configuration file
 *
 * Returns mappedData, but error occurs it throws error
 * @param dataType
 * @param data
 */
export async function classMapperAndValidator<T extends object>(
  dataType: new () => T,
  data: object
) {
  const mappedData = plainToInstance(dataType, data);
  const error = await validate(mappedData);
  if (error.length > 0) {
    throw new Error(error.toString());
  }

  return mappedData;
}
