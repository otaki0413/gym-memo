import { handleAuthError, handleAuthSuccess } from "~/services/session.server";
import type { Route } from "./+types/google-callback";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    return await handleAuthSuccess("google", request);
  } catch (error) {
    return await handleAuthError("google", error);
  }
}
