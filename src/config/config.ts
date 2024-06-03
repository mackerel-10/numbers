import path from 'path';
import dotenv from 'dotenv';

// Set the environment to development if not set
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ROOT_PATH = path.resolve(__dirname, '../../');
dotenv.config({ path: `${ROOT_PATH}/.env.${NODE_ENV}` });

export const PORT = Number(process.env.PORT) || 3000;
export const SKIP_ENV_TEST = process.env.SKIP_ENV_CHECK === 'true';
