import path from "path";
import dotenv from "dotenv";

// Set the environment to development if not set
export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const ROOT_PATH = path.resolve(__dirname, "../");
dotenv.config({ path: `${ROOT_PATH}/.env.${ENVIRONMENT}` });

export const PORT = process.env.PORT || 3000;
