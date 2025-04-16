import type { Route } from "./+types/training";
import { DailyMenuSelection } from "~/components/Training/DailyMenuSelection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  // TODO: ユーザーの登録しているメニュー情報を取得
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Training({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <div className="space-y-3 p-3">
      <div className="text-xl font-bold">本日のトレーニング</div>
      <div>
        <DailyMenuSelection />
      </div>
    </div>
  );
}
