import { redirect } from "react-router";
import { getSession, sessionStorage } from "~/services/session.server";
import type { Route } from "./+types/logout";

export const loader = async () => {
  return redirect("/auth/login");
};

export const action = async ({ request }: Route.ActionArgs) => {
  const session = await getSession(request);
  return redirect("/auth/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
};
