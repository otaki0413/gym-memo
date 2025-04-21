import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const cuid = () =>
  text("id", { mode: "text", length: 24 })
    .primaryKey()
    .$defaultFn(() => createId());

export const createdAt = text("created_at")
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`);

export const updatedAt = text("updated_at")
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`)
  .$onUpdate(() => new Date().toISOString());
