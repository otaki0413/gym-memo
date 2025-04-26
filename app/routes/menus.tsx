import { PlusIcon } from "lucide-react";
import type { Route } from "./+types/menus";
import { Button } from "~/components/ui/button";
import { MenuList } from "~/components/Menu/MenuList";
import { MenuTabs } from "~/components/Menu/MenuTabs";
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

export default function Menus({ loaderData }: Route.ComponentProps) {
  const { myMenus } = loaderData;

  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">マイメニューの管理</div>
        <div>
          <Button variant="outline" className="aspect-square max-sm:p-0">
            <PlusIcon size={16} aria-hidden="true" />
            新規作成
          </Button>
        </div>
      </div>

      {/* メニューの切り替えタブ */}
      <MenuTabs />

      {/* マイメニューリスト */}
      <MenuList initialMenus={myMenus} />
    </div>
  );
}
