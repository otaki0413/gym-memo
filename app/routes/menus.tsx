import { PlusIcon } from "lucide-react";
import type { Route } from "./+types/menus";
import { Button } from "~/components/ui/button";
import { MenuList } from "~/components/Menu/MenuList";
import MenuTabs from "~/components/Menu/MenuTabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// モックデータ
const mockMenus = [
  { id: "1", name: "ベンチプレス", sets: 3, reps: 10 },
  { id: "2", name: "スクワット", sets: 4, reps: 8 },
  { id: "3", name: "デッドリフト", sets: 3, reps: 5 },
  { id: "4", name: "ラットプルダウン", sets: 3, reps: 12 },
  { id: "5", name: "ショルダープレス", sets: 3, reps: 10 },
];

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Menus({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
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
      <MenuList initialMenus={mockMenus} />
    </div>
  );
}
