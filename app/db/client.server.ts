import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Drizzle client for connecting to Turso
export function buildDbClient(env: Env) {
  const url = env.TURSO_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_URL is not defined");
  }

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("TURSO_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }));
}
