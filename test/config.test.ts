import path from 'path';
import fs from 'fs';
import { validate } from 'class-validator';
import { NODE_ENV, ROOT_PATH, PORT } from '../src/config/config';
import Env from '../src/validations/env';

const validateEnvFile = () => {
  const envPath = path.resolve(ROOT_PATH, `.env.${NODE_ENV}`);
  const isExist = fs.existsSync(envPath);

  expect(isExist).toBe(true);
};

const validateEnvVariables = async () => {
  const env = new Env();
  env.PORT = PORT;

  try {
    await validate(env);
  } catch (error) {
    expect(error).toEqual([]);
  }
};

describe('Environment file existence check', () => {
  // Test file existence
  test(`Check ${NODE_ENV} environment file is exist`, validateEnvFile);

  // Test environment variables
  test(`Validate ${NODE_ENV} environment variables`, validateEnvVariables);
});
