import { Link, NavLink, Outlet } from "react-router";
import { Home, List, History, Dumbbell } from "lucide-react";
import { Button } from "../ui/button";

export default function AppLayout({
  hasBottomNav = false,
}: {
  hasBottomNav?: boolean;
}) {
  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: Home,
    },
    {
      href: "/training",
      label: "トレーニング",
      icon: Dumbbell,
    },
    {
      href: "/menus",
      label: "メニュー",
      icon: List,
    },
    {
      href: "/history",
      label: "履歴",
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex flex-col sm:max-w-4xl">
        {/* ヘッダー */}
        <header className="border-b px-2 py-3">
          <div className="container flex justify-between">
            <div className="flex items-center gap-x-4">
              <Link
                to="/"
                className="flex cursor-pointer items-center justify-center text-2xl font-semibold"
              >
                GymLog
              </Link>
            </div>
            <div>
              <Button>ログイン</Button>
            </div>
          </div>
        </header>

        {/* ナビゲーション + コンテンツ */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row">
          {/* ナビゲーション */}
          <nav className="fixed bottom-0 z-50 w-full border-t sm:relative sm:bottom-auto sm:z-0 sm:w-auto">
            <div className="flex h-16 flex-row items-center justify-around sm:flex-col sm:items-start sm:gap-y-2">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="flex flex-col items-center gap-x-2 rounded-full p-2 text-slate-700 hover:bg-slate-200 sm:flex-row"
                >
                  <item.icon className="size-5" />
                  <span className="text-xs sm:text-lg">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
          {/* コンテンツ */}
          <main className="flex-1 text-center">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
