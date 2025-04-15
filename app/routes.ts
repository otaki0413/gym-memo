import {
  type RouteConfig,
  index,
  layout,
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
] satisfies RouteConfig;
