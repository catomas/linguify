import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "aws-data-api",
  dialect: "postgresql",

  dbCredentials: {
    // @ts-ignore
    url: process.env.DATABASE_URL!,
  },
});
