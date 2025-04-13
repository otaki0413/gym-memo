import type { Route } from "./+types/training";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Training({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <div>
      <p>{message}</p>
      <p>トレーニングページ</p>
    </div>
  );
}
