import path from 'path';
import dotenv from 'dotenv';
import { configureEnvFile } from '../utils/envFile';

/**
 * Server Config
 */
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ROOT_PATH = path.resolve(__dirname, '../../');
export const ENV_FILE = configureEnvFile();
dotenv.config({ path: `${ROOT_PATH}/${ENV_FILE}` });
export const SKIP_ENV_TEST = Boolean(process.env.SKIP_ENV_TEST);
export const PORT = Number(process.env.PORT) || 3000;

/**
 * Database Config
 */
export const DB_TYPE = 'mysql';
export const DB_HOST = process.env.MYSQL_HOST;
export const DB_PORT = Number(process.env.MYSQL_PORT) || 3306;
export const DB_DATABASE = process.env.MYSQL_DATABASE;
export const DB_USER = process.env.MYSQL_USER;
export const DB_PASSWORD = process.env.MYSQL_PASSWORD;

/**
 * Bcrypt Config
 */
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Logger Config
 */
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
