import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Drizzle client for connecting to Turso
export const db = (env: Env) => {
  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  return drizzle(client);
};
