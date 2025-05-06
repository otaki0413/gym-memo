import { CheckInCalendar } from "~/components/CheckIn/CheckInCalendar";
import { CheckInAchievement } from "~/components/CheckIn/CheckInAchevement";
import { CheckInPanel } from "~/components/CheckIn/CheckInPanel";
import type { Route } from "./+types/checkIn";
import { getSessionUser } from "~/services/session.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  // TODO: チェックインした日付データ取得
  const { sessionUser } = await getSessionUser(request);
  return {
    user: sessionUser,
  };
}

// チェックインページ
export default function CheckIn({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className="space-y-2 p-3">
      <CheckInPanel user={user} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <CheckInAchievement />
        <CheckInCalendar />
      </div>
    </div>
  );
}
