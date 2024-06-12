import path from 'path';
import fs from 'fs';
import {
  NODE_ENV,
  ROOT_PATH,
  PORT,
  SKIP_ENV_TEST,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  SALT_ROUNDS,
  LOG_LEVEL,
} from '../../src/config/config';
import EnvDto from '../../src/config/envConfig';
import logger from '../../src/config/logger';
import { configureEnvFile, configValidator } from '../../src/config/utils';

describe('Environment variables configuration', () => {
  test('Check choosing correct file depends on NODE_ENV: configureEnvFile', () => {
    expect(configureEnvFile()).toBe(`.env.${NODE_ENV}`);
  });

  if (!SKIP_ENV_TEST) {
    // Test file existence
    test(`Check ${NODE_ENV} environment file is exist`, () => {
      const envPath = path.resolve(ROOT_PATH, `.env.${NODE_ENV}`);
      const isExist = fs.existsSync(envPath);

      expect(isExist).toBeTruthy();
    });

    // Test environment variables configuration
    test(`Validate ${NODE_ENV} environment variables`, async () => {
      const result = await configValidator(EnvDto, {
        MYSQL_HOST: DB_HOST,
        MYSQL_PORT: DB_PORT,
        MYSQL_DATABASE: DB_DATABASE,
        MYSQL_USER: DB_USER,
        MYSQL_PASSWORD: DB_PASSWORD,
        PORT,
        LOG_LEVEL,
        SALT_ROUNDS,
      });

      expect(result).toEqual([]); // Expect on error
    });
  } else {
    it('Skip environment test', () => {
      logger.debug('Environment test is skipped');
    });
  }
});
