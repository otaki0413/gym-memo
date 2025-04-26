import { redirect } from "react-router";
import { authenticator } from "~/services/auth.server";
import { saveSession } from "~/services/session.server";
import type { Route } from "./+types/google-callback";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await authenticator.authenticate("google", request);
  const headers = await saveSession(request, user);
  return redirect("/", { headers });
};
