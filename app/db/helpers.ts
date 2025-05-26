import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/sqlite-core";

export const cuid = () =>
  text("id", { mode: "text", length: 24 })
    .primaryKey()
    .$defaultFn(() => createId());

export const createdAt = text("created_at")
  .notNull()
  .$defaultFn(() => new Date().toISOString());

export const updatedAt = text("updated_at")
  .notNull()
  .$defaultFn(() => new Date().toISOString())
  .$onUpdateFn(() => new Date().toISOString());
