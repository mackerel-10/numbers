import path from 'path';
import fs from 'fs';
import { validate } from 'class-validator';
import { ENVIRONMENT, ROOT_PATH, PORT } from '../src/config/config';
import Env from '../src/validations/env';

const validateEnvFile = () => {
  const envPath = path.resolve(ROOT_PATH, `.env.${ENVIRONMENT}`);

  expect(fs.existsSync(envPath)).toBe(true);
};

const validateEnvVariables = async () => {
  const env = new Env();
  env.PORT = PORT;

  try {
    const errors = await validate(env);
    expect(errors).toEqual([]);
  } catch (error) {
    fail(`Validation failed with error: ${error}`);
  }
};

describe('Environment file existence check', () => {
  // Test file existence
  test(`Check ${ENVIRONMENT} environment file is exist`, validateEnvFile);

  // Test environment variables
  test(`Validate ${ENVIRONMENT} environment variables`, validateEnvVariables);
});
