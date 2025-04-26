import { createCookieSessionStorage, redirect } from "react-router";
import { authenticator, type SessionUser } from "./auth.server";

export const SESSION_KEY = "user";
export const sessionStorage = createCookieSessionStorage<{
  [SESSION_KEY]: SessionUser;
}>({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET || ""],
    secure: process.env.NODE_ENV === "production",
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
  return { session, sessionUser: sessionUser ?? null };
}

/**
 * 認証成功 + リダイレクト処理
 */
export async function handleAuthSuccess(
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
  if (error instanceof Error) throw error;
  throw redirect(redirectTo);
}
