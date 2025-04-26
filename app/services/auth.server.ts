import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "@coji/remix-auth-google";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { buildDbClient } from "~/db/client.server";
import { userTable } from "~/db/schema";
import { env } from "cloudflare:workers";

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
};

type AuthProfile = {
  email?: string;
  displayName?: string;
  avatarUrl?: string;
};

export const authenticator = new Authenticator<SessionUser>();
const googleStrategy = new GoogleStrategy<SessionUser>(
  {
    clientId: env.GOOGLE_CLIENT_ID || "",
    clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    redirectURI: `${env.APP_URL}/auth/google/callback`,
  },
  async ({ tokens }) => {
    const profile = await GoogleStrategy.userProfile(tokens);

    const authUser = await handleUserAuth({
      email: profile._json.email || profile?.emails[0]?.value,
      displayName: profile.displayName,
      avatarUrl: profile._json.picture || profile?.photos[0]?.value,
    });

    return {
      id: authUser.id,
      email: authUser.email,
      username: authUser.username,
      displayName: authUser.displayName,
      avatarUrl: authUser.avatarUrl,
    };
  },
);
authenticator.use(googleStrategy);

/**
 * ユーザー認証処理
 *
 * @param profile - 認証されたユーザープロフィール
 * @returns - ユーザー情報
 */
export async function handleUserAuth(profile: AuthProfile) {
  let { email, displayName, avatarUrl } = profile;

  if (!email) {
    throw new Error(`Email is required for google authentication`);
  }

  // プロフィール情報のフォーマット
  email = email.toLowerCase();
  let username = email
    .substring(0, email.indexOf("@"))
    .replace(/[^0-9a-z]/g, "_");
  displayName = displayName ?? username;

  // DBクライアント作成
  const db = buildDbClient(env);

  // 既存ユーザー取得
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .get();

  // 既存ユーザーが存在する場合、ユーザー情報更新
  if (existingUser && existingUser.email === email) {
    await db
      .update(userTable)
      .set({
        avatarUrl,
        displayName,
      })
      .where(eq(userTable.id, existingUser.id));
    console.log("👷 User updated:", existingUser);
    return existingUser;
  }

  // ユーザー名の重複チェック
  const userId = createId();
  const usernameCheck = await db
    .select({ username: userTable.username })
    .from(userTable)
    .where(eq(userTable.username, username))
    .get();

  if (usernameCheck) {
    username = `${username}_${userId.slice(0, 6)}`;
  }

  // 新規ユーザー作成
  try {
    const newUser = await db
      .insert(userTable)
      .values({
        id: userId,
        username,
        email,
        displayName,
        avatarUrl,
      })
      .returning()
      .get();
    console.log("✅ New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Login failed, please try again");
  }
}
