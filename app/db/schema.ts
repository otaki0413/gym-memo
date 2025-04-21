import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { cuid, createdAt, updatedAt } from "./helpers";

export const userTable = sqliteTable("user", {
  id: cuid(),
  username: text("username", { mode: "text" }).notNull().unique(),
  displayName: text("display_name", { mode: "text" }),
  email: text("email", { mode: "text" }).notNull().unique(),
  avatarUrl: text("avatar_url", { mode: "text" }),
  bio: text("bio", { mode: "text" }),
  createdAt,
  updatedAt,
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export const checkInTable = sqliteTable("check_in", {
  id: cuid(),
  userId: text("user_id", { mode: "text" })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  checkInDate: text("check_in_date", { mode: "text" }).notNull(), // 登録時に"YYYY-MM-DD"形式で保存する
  createdAt,
  updatedAt,
});

export type InsertCheckIn = typeof checkInTable.$inferInsert;
export type SelectCheckIn = typeof checkInTable.$inferSelect;

export const exerciseTable = sqliteTable("exercise", {
  id: cuid(),
  name: text("name", { mode: "text" }).notNull(),
  type: text("type", { mode: "text" }).notNull(),
  unit: text("unit", { mode: "text", enum: ["rep", "min", "meter"] }).notNull(),
  remarks: text("remarks", { mode: "text" }),
  createdAt,
  updatedAt,
});

export type InsertExercise = typeof exerciseTable.$inferInsert;
export type SelectExercise = typeof exerciseTable.$inferSelect;

export const trainingMenuTable = sqliteTable("training_menu", {
  id: cuid(),
  userId: text("user_id", { mode: "text" })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exerciseTable.id, { onDelete: "cascade" }),
  menuName: text("menu_name").notNull(),
  sets: int("sets").notNull(),
  reps_per_set: int("reps_per_set"),
  time_per_set: int("time_per_set"),
  distance_per_set: int("distance_per_set"),
  createdAt,
  updatedAt,
});

export type InsertTrainingMenu = typeof trainingMenuTable.$inferInsert;
export type SelectTrainingMenu = typeof trainingMenuTable.$inferSelect;

export const trainingLogTable = sqliteTable("training_log", {
  id: cuid(),
  userId: text("user_id", { mode: "text" })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  trainingMenuId: text("training_menu_id")
    .notNull()
    .references(() => trainingMenuTable.id, { onDelete: "cascade" }),
  status: text("status", {
    mode: "text",
    enum: ["not_started", "in_progress", "completed", "canceled"],
  }).notNull(),
  remarks: text("remarks"),
  createdAt,
  updatedAt,
});

export type InsertTrainingLog = typeof trainingLogTable.$inferInsert;
export type SelectTrainingLog = typeof trainingLogTable.$inferSelect;

export const trainingLogDetailTable = sqliteTable("training_log_detail", {
  id: cuid(),
  trainingLogId: text("training_log_id")
    .notNull()
    .references(() => trainingLogTable.id, { onDelete: "cascade" }),
  setNumber: int("set_number").notNull(),
  reps: int("reps"),
  time: int("time"),
  distance: int("distance"),
  createdAt,
  updatedAt,
});

export type InsertTrainingLogDetail =
  typeof trainingLogDetailTable.$inferInsert;
export type SelectTrainingLogDetail =
  typeof trainingLogDetailTable.$inferSelect;
