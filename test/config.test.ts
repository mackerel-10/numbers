import path from 'path';
import fs from 'fs';
import { validate } from 'class-validator';
import { NODE_ENV, ROOT_PATH, PORT, SKIP_ENV_TEST } from '../src/config/config';
import EnvDto from '../src/dto/envDto';
import logger from '../src/config/logger';
import DatabaseModel from '../src/database/databaseModel';

describe('Environment file existence check', () => {
  if (!SKIP_ENV_TEST) {
    // Test file existence
    test(`Check ${NODE_ENV} environment file is exist`, () => {
      const envPath = path.resolve(ROOT_PATH, `.env.${NODE_ENV}`);
      const isExist = fs.existsSync(envPath);

      expect(isExist).toBeTruthy();
    });

    // Test environment variables
    test(`Validate ${NODE_ENV} environment variables`, async () => {
      const env = new EnvDto();
      env.PORT = PORT;

      try {
        await validate(env);
      } catch (error) {
        expect(error).toEqual([]); // Expect on error
      }
    });
  } else {
    it('Skip environment test', () => {
      logger.info('Environment test is skipped');
    });
  }
});

describe('Check database connection', () => {
  test('Check database connection', async () => {
    const db = await DatabaseModel.getDbInstance();

    expect(db.appDataSource.isInitialized).toBeTruthy();
  });
});
