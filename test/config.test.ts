import path from "path";
import fs from "fs";
import { ENVIRONMENT, ROOT_PATH } from "../src/config";

const validateEnvFile = () => {
  const envPath = path.resolve(ROOT_PATH, `.env.${ENVIRONMENT}`);

  expect(fs.existsSync(envPath)).toBe(true);
};

describe("Environment file existence check", () => {
  test(`Check ${ENVIRONMENT} environment file is exist`, validateEnvFile);
});
