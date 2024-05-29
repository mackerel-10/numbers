import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: "../" + __dirname + "/.env.local" });

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
