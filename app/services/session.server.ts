import { createCookieSessionStorage } from "react-router";
import type { SessionUser } from "./auth.server";

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

export const getSession = async (request: Request) => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

export const getSessionUser = async (request: Request) => {
  const session = await getSession(request);
  return session?.get(SESSION_KEY);
};

export const saveSession = async (request: Request, user: SessionUser) => {
  const session = await getSession(request);
  session.set(SESSION_KEY, user);
  return new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session),
  });
};

export const destroySession = async (request: Request) => {
  const session = await getSession(request);
  return new Headers({
    "Set-Cookie": await sessionStorage.destroySession(session),
  });
};
