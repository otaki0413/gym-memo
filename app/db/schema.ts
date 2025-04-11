import { sql } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";

export const userTable = s.sqliteTable("user", {
  id: s.int().primaryKey({ autoIncrement: true }),
  clerkId: s.text("clerk_id").notNull().unique(),
  email: s.text("email").notNull().unique(),
  username: s.text("username").notNull().unique(),
  avatarUrl: s.text("avatar_url"),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});

export const checkInTable = s.sqliteTable("check_in", {
  id: s.int().primaryKey({ autoIncrement: true }),
  userId: s
    .int("user_id")
    .notNull()
    .references(() => userTable.id),
  checkInDate: s.text("check_in_date").notNull(),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});

export const exerciseTable = s.sqliteTable("exercise", {
  id: s.int().primaryKey({ autoIncrement: true }),
  name: s.text("name").notNull(),
  type: s.text("type").notNull(),
  unit: s.text("unit").$type<"rep" | "min" | "meter">().notNull(),
  remarks: s.text("remarks"),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});

export const trainingMenuTable = s.sqliteTable("training_menu", {
  id: s.int().primaryKey({ autoIncrement: true }),
  userId: s
    .int("user_id")
    .notNull()
    .references(() => userTable.id),
  exerciseId: s
    .int("exercise_id")
    .notNull()
    .references(() => exerciseTable.id),
  menuName: s.text("menu_name").notNull(),
  sets: s.int("sets").notNull(),
  reps_per_set: s.int("reps_per_set"),
  time_per_set: s.int("time_per_set"),
  distance_per_set: s.int("distance_per_set"),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});

export const trainingLogTable = s.sqliteTable("training_log", {
  id: s.int().primaryKey({ autoIncrement: true }),
  userId: s
    .int("user_id")
    .notNull()
    .references(() => userTable.id),
  trainingMenuId: s
    .int("training_menu_id")
    .notNull()
    .references(() => trainingMenuTable.id),
  status: s
    .text("status")
    .notNull()
    .$type<"in_progress" | "completed" | "not_completed">(),
  remarks: s.text("remarks"),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});

export const trainingLogDetailTable = s.sqliteTable("training_log_detail", {
  id: s.int().primaryKey({ autoIncrement: true }),
  trainingLogId: s
    .int("training_log_id")
    .notNull()
    .references(() => trainingLogTable.id),
  trainingMenuId: s
    .int("training_menu_id")
    .notNull()
    .references(() => trainingMenuTable.id),
  setNumber: s.int("set_number").notNull(),
  reps: s.int("reps"),
  time: s.int("time"),
  distance: s.int("distance"),
  createdAt: s
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: s
    .text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date().toISOString()),
});
