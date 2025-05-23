import { Link, NavLink, Outlet, redirect } from "react-router";
import { Home, List, History, Dumbbell } from "lucide-react";
import { UserNav } from "~/components/UserNav";
import { getSessionUser } from "~/services/session.server";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const { session, sessionUser } = await getSessionUser(request);
  if (!session || sessionUser === undefined) {
    throw redirect("/auth/login");
  }
  return { user: sessionUser };
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
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
      label: "マイメニュー",
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
        <header className="flex justify-between border-b p-3">
          <div className="flex items-center gap-x-4">
            <Link
              to="/"
              className="flex cursor-pointer items-center justify-center text-2xl font-semibold"
            >
              GymMemo
            </Link>
          </div>
          {/* ユーザーメニュー */}
          <UserNav user={user} />
        </header>

        {/* ナビゲーション + コンテンツ */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row">
          {/* ナビゲーション */}
          <nav className="fixed bottom-0 z-50 w-full border-t bg-slate-100 sm:relative sm:bottom-auto sm:z-0 sm:mt-4 sm:mr-10 sm:w-auto sm:border-0">
            <div className="flex h-16 flex-row items-center justify-around sm:flex-col sm:items-start sm:gap-y-2">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `${isActive && "font-semibold"} flex flex-col items-center gap-x-2 rounded-full p-2 hover:bg-slate-200 sm:flex-row`
                  }
                >
                  <item.icon className="size-5" />
                  <span className="text-xs sm:text-lg">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
          {/* コンテンツ */}
          <main className="h-full flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
