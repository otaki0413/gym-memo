import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/Layout/AppLayout.tsx", [
    index("routes/checkIn.tsx"),
    route("posts", "routes/posts.tsx"),
    route("training", "routes/training.tsx"),
    route("menus", "routes/menus.tsx"),
    route("history", "routes/history.tsx"),
  ]),

  // 認証用のルート
  ...prefix("auth", [
    layout("routes/auth/layout.tsx", [
      route("login", "routes/auth/login.tsx"),
      route("google", "routes/auth/google.tsx"),
      route("google/callback", "routes/auth/google-callback.ts"),
    ]),
  ]),
] satisfies RouteConfig;
