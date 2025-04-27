import { useRouteLoaderData } from "react-router";
import type { loader as rootLoader } from "~/root.tsx";

export function useOptionalUser() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  if (!data) return undefined;
  return data.sessionUser;
}

export function useUser() {
  const optionalUser = useOptionalUser();
  if (!optionalUser) throw new Error("No user found in root loader.");
  return optionalUser;
}
