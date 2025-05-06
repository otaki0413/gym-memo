import {
  createCookieSessionStorage,
  redirect,
  type Session,
} from "react-router";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { authenticator, type SessionUser } from "./auth.server";
import { buildDbClient } from "~/db/client.server";
import { userTable } from "~/db/schema";

export const SESSION_KEY = "user";
export const sessionStorage = createCookieSessionStorage<{
  [SESSION_KEY]: SessionUser;
}>({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [env.SESSION_SECRET || ""],
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

/**
 * Cookieからセッションデータを取得する
 */
export const getSession = async (request: Request) => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

/**
 * Cookieからセッションデータと関連するユーザー情報を取得する
 */
export async function getSessionUser(request: Request) {
  const session = await getSession(request);
  const sessionUser = session.get(SESSION_KEY);
  return { session, sessionUser };
}

/**
 * 認証成功 + リダイレクト処理
 */
export async function handleAuthSuccess(
  // authenticator: ReturnType<typeof createAuth>,
  provider: string,
  request: Request,
  redirectTo = "/",
) {
  const user = await authenticator.authenticate(provider, request);
  const session = await getSession(request);
  session.set(SESSION_KEY, user);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

/**
 * 認証エラー + リダイレクト処理
 */
export async function handleAuthError(
  provider: string,
  error: unknown,
  redirectTo = "/auth/login",
) {
  console.error(`Auth Error [${provider}]:`, error);
  if (error instanceof Error) throw error;
  throw redirect(redirectTo);
}

/**
 * セッション検証後、有効なユーザー取得
 */
export async function validateSession(
  session: Session,
  sessionUser: SessionUser,
) {
  if (!sessionUser.id) {
    return null;
  }

  // セッションユーザーに一致するユーザーをDB取得
  const db = buildDbClient(env);
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, sessionUser.id))
    .get();

  // セッションが無効な場合は、セッションを破棄してリダイレクト
  if (user === undefined) {
    throw redirect("/auth/login", {
      headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
    });
  }

  return user;
}

/**
 * ユーザーが認証されてないことを確認する (for login/register pages)
 */
// export async function requireAnonymous(request: Request, redirectTo = "/") {
//   const { session, sessionUser } = await getSessionUser(request);
//   if (!sessionUser) {
//     throw redirect("/");
//   }
//   const validSessionUser = await validateSession(session, sessionUser);
//   if (validSessionUser) {
//     throw redirect(redirectTo);
//   }
// }

/**
 * （保護されたページに対して）ユーザーが認証されていることを確認する
 */
// export async function requireAuth(
//   request: Request,
//   redirectTo = "/auth/login",
// ) {

// }
