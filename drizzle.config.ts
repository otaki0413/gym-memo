import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

// ENV に応じて読み込む環境変数ファイルを切替え
const currentEnv = process.env.ENV ?? "development";
console.log(`Current environment: ${currentEnv}`);
dotenv.config({
  path: currentEnv === "production" ? ".prod.vars" : ".dev.vars",
});

if (!process.env.TURSO_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error("環境変数が設定されていません。");
  process.exit(1);
}

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} as Config;
