import { CheckInCalendar } from "~/components/CheckIn/CheckInCalendar";
import { CheckInAchievement } from "~/components/CheckIn/CheckInAchevement";
import { CheckInPanel } from "~/components/CheckIn/CheckInPanel";
import type { Route } from "./+types/checkIn";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  // チェックインした日付データ取得
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

// チェックインページ
export default function CheckIn({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <div className="space-y-2 p-3">
      <CheckInPanel />
      <div className="flex flex-col gap-2 sm:flex-row">
        <CheckInAchievement />
        <CheckInCalendar />
      </div>
    </div>
  );
}
