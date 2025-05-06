import { Form, redirect } from "react-router";
import { GoogleIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import logoRunningMan from "~/components/Training/logo-running-man.svg";
import { getSessionUser } from "~/services/session.server";
import type { Route } from "./+types/login";

export async function loader({ request }: Route.LoaderArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (sessionUser) {
    return redirect("/");
  }
  return null;
}

export default function Login() {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row-reverse sm:items-center">
      <div className="flex justify-center">
        <img
          src={logoRunningMan}
          alt="GymMemo Logo"
          className="w-full max-w-md"
        />
      </div>

      <div className="space-y-8">
        <div className="">
          <h1 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
            GymMemo
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            ジムを習慣化しよう
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              1
            </div>
            <p className="ml-3 text-sm">
              シンプルな操作で素早くトレーニングを記録
            </p>
          </div>

          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              2
            </div>
            <p className="ml-3 text-sm">自分だけのメニューをカスタマイズ可能</p>
          </div>

          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              3
            </div>
            <p className="ml-3 text-sm">実績を振り返ってモチベーションアップ</p>
          </div>
        </div>

        <Form action="/auth/google" method="POST">
          <Button
            type="submit"
            variant="outline"
            className="h-12 w-full gap-2 sm:w-[200px]"
            aria-label="Continue with Google account"
          >
            <GoogleIcon className="size-5" />
            <span className="font-semibold">Googleでログイン</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
