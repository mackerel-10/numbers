import path from 'path';
import dotenv from 'dotenv';

/**
 * Server Config
 */
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ROOT_PATH = path.resolve(__dirname, '../../');
dotenv.config({ path: `${ROOT_PATH}/.env.${NODE_ENV}` });
export const SKIP_ENV_TEST = process.env.SKIP_ENV_TEST === 'true';
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
