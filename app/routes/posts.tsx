import { Button } from "~/components/ui/button";
import type { Route } from "./+types/posts";
import { Link } from "react-router";

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white px-2 py-3 sm:px-0">
        <div className="container mx-auto flex flex-col justify-between gap-2 sm:flex-row">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-4">
              <Link
                to="/"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-amber-400 text-xl font-semibold text-white shadow-xl hover:bg-amber-600"
              >
                B
              </Link>
              <span className="text-xl font-semibold">BlogSpace</span>
            </div>
            <div className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-white hover:bg-slate-300 sm:hidden">
              &#128100;
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                className="w-full rounded-sm bg-slate-100 px-4 py-2 focus:outline-2 focus:outline-amber-400"
              />
              <span className="absolute top-2 right-3">&#128269;</span>
            </div>
            <Button className="hidden cursor-pointer sm:block">ログイン</Button>
            <div className="hidden size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-white hover:bg-slate-300 sm:flex">
              &#128100;
            </div>
          </div>
        </div>
      </header>
      <main>main</main>
    </div>
  );
}
