import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

// 開発環境用の環境変数の読込
dotenv.config({ path: ".dev.vars" });

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} as Config;
