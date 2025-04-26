import { Link } from "react-router";
import type { Route } from "./+types/training";
import { DailyMenuSelection } from "~/components/Training/DailyMenuSelection";
import { trainingMenuTable } from "~/db/schema";
import { buildDbClient } from "~/db/client.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = buildDbClient(context.cloudflare.env);
  // TODO: 将来的にユーザーIDを取得して、マイメニューを取得する
  const myMenus = await db.select().from(trainingMenuTable);
  return { myMenus };
}

export default function Training({ loaderData }: Route.ComponentProps) {
  const { myMenus } = loaderData;
  return (
    <div className="space-y-3 p-3">
      <div className="text-2xl font-semibold">本日のトレーニング</div>
      <div className="rounded-lg border bg-white p-4 shadow sm:p-6">
        <h2 className="mb-2 text-base font-semibold">
          ⭐トレーニングのヒント⭐
        </h2>
        <ul className="text-muted-foreground m-2 list-disc space-y-2 text-xs sm:text-base">
          <li>登録済みのマイメニューの中から選択できます。</li>
          <li>
            メニューは「
            <Link
              to="/menus"
              className="underline underline-offset-3 hover:text-black"
            >
              マイメニュー
            </Link>
            」から追加・編集できます。
          </li>
          <li>
            トレーニング履歴は「
            <Link
              to="/history"
              className="underline underline-offset-3 hover:text-black"
            >
              履歴
            </Link>
            」ページで確認できます。
          </li>
        </ul>
      </div>
      <div>
        <DailyMenuSelection myMenus={myMenus} />
      </div>
    </div>
  );
}
