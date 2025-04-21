import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import {
  userTable,
  exerciseTable,
  trainingMenuTable,
  trainingLogDetailTable,
  trainingLogTable,
  checkInTable,
} from "./schema";

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

const turso = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(turso);

// テーブルのリセット
async function resetTables() {
  try {
    console.log("Resetting tables...");

    // 子テーブルから削除（外部キー制約を考慮した順序）
    await db.delete(trainingLogDetailTable);
    await db.delete(trainingLogTable);
    await db.delete(trainingMenuTable);
    await db.delete(exerciseTable);
    await db.delete(checkInTable);
    await db.delete(userTable);

    console.log("All tables have been reset!");
  } catch (error) {
    console.error("Error resetting tables:", error);
    throw error;
  }
}

async function seed() {
  try {
    // テーブルのリセット
    await resetTables();

    // ユーザーデータの追加
    const users = await db
      .insert(userTable)
      .values([
        {
          username: "fitness_lover",
          displayName: "フィットネス愛好家",
          email: "user1@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
          bio: "毎日のトレーニングを欠かさず継続中！",
        },
        {
          username: "gym_master",
          displayName: "ジムの達人",
          email: "user2@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
          bio: "プロのトレーナーとして活動中",
        },
        // 新しいユーザーを追加
        {
          username: "workout_beginner",
          displayName: "トレーニング初心者",
          email: "user3@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
          bio: "筋トレを始めたばかりです！アドバイスください！",
        },
      ])
      .returning();

    // チェックインデータの追加
    await db.insert(checkInTable).values([
      {
        userId: users[0].id,
        checkInDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD形式
      },
      {
        userId: users[1].id,
        checkInDate: new Date().toISOString().split("T")[0],
      },
      {
        userId: users[2].id,
        checkInDate: new Date().toISOString().split("T")[0],
      },
    ]);

    // トレーニング種目データの追加
    const exercises = await db
      .insert(exerciseTable)
      .values([
        {
          name: "ベンチプレス",
          type: "chest",
          unit: "rep",
          remarks: "大胸筋のメイン種目",
        },
        {
          name: "ショルダープレス",
          type: "shoulders",
          unit: "rep",
          remarks: "肩のメイン種目",
        },
        {
          name: "バイセプスカール",
          type: "arms",
          unit: "rep",
          remarks: "上腕二頭筋を鍛える種目",
        },
        {
          name: "スクワット",
          type: "legs",
          unit: "rep",
          remarks: "下半身のメイン種目",
        },
        {
          name: "デッドリフト",
          type: "back",
          unit: "rep",
          remarks: "全身を鍛えるコンパウンド種目",
        },
        {
          name: "プルアップ",
          type: "back",
          unit: "rep",
          remarks: "広背筋を鍛える自重種目",
        },
        {
          name: "ランニング",
          type: "cardio",
          unit: "min",
          remarks: "有酸素運動",
        },
        {
          name: "ウォーキング",
          type: "cardio",
          unit: "min",
          remarks: "有酸素運動",
        },
        {
          name: "腹筋",
          type: "core",
          unit: "rep",
          remarks: "体幹を鍛える静的種目",
        },
      ])
      .returning();

    // トレーニングメニューデータの追加
    await db
      .insert(trainingMenuTable)
      .values([
        // User 1's training menus
        {
          userId: users[0].id,
          exerciseId: exercises[0].id,
          menuName: "胸筋モリモリベンチプレス",
          sets: 3,
          reps_per_set: 12,
        },
        {
          userId: users[0].id,
          exerciseId: exercises[3].id,
          menuName: "脚力爆上げスクワット",
          sets: 4,
          reps_per_set: 15,
        },
        {
          userId: users[0].id,
          exerciseId: exercises[6].id,
          menuName: "爽快ランニングタイム",
          sets: 1,
          time_per_set: 20,
        },

        // User 2's training menus
        {
          userId: users[1].id,
          exerciseId: exercises[1].id,
          menuName: "肩ゴリゴリショルダープレス",
          sets: 3,
          reps_per_set: 10,
        },
        {
          userId: users[1].id,
          exerciseId: exercises[4].id,
          menuName: "全身パワーデッドリフト",
          sets: 5,
          reps_per_set: 8,
        },
        {
          userId: users[1].id,
          exerciseId: exercises[7].id,
          menuName: "リラックスウォーキング",
          sets: 1,
          time_per_set: 30,
        },

        // User 3's training menus
        {
          userId: users[2].id,
          exerciseId: exercises[2].id,
          menuName: "腕パンパンバイセプスカール",
          sets: 4,
          reps_per_set: 12,
        },
        {
          userId: users[2].id,
          exerciseId: exercises[5].id,
          menuName: "背筋バキバキプルアップ",
          sets: 3,
          reps_per_set: 10,
        },
        {
          userId: users[2].id,
          exerciseId: exercises[8].id,
          menuName: "腹筋割れるぞプログラム",
          sets: 3,
          reps_per_set: 20,
        },
      ])
      .returning();

    console.log("Seed data inserted successfully!");
    turso.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    turso.close();
    process.exit(1);
  }
}
seed();
