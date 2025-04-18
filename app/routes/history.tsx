import type { Route } from "./+types/history";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function History({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">トレーニングの履歴</div>
      </div>

      {/* トレーニング履歴リスト */}
    </div>
  );
}
