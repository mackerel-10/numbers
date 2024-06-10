import { NODE_ENV } from '../config/config';

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
