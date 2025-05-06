import { authenticator } from "~/services/auth.server";
import type { Route } from "./+types/google";

export const action = async ({ request }: Route.ActionArgs) => {
  return await authenticator.authenticate("google", request);
};
