import type { Route } from "./+types/menus";
import { parseWithZod } from "@conform-to/zod";
import { eq } from "drizzle-orm";
import { MenuList } from "~/components/Menu/MenuList";
import { MenuTabs } from "~/components/Menu/MenuTabs";
import { exerciseTable, trainingMenuTable } from "~/db/schema";
import { buildDbClient } from "~/db/client.server";
import { MenuCreateModal, schema } from "~/components/Menu/MenuCreateModal";
import { getSessionUser } from "~/services/session.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "マイメニュー" },
    { name: "description", content: "マイメニューページです" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (!sessionUser) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const db = buildDbClient(context.cloudflare.env);
  const myMenus = await db
    .select()
    .from(trainingMenuTable)
    .where(eq(trainingMenuTable.userId, sessionUser.id));
  const exercises = await db.select().from(exerciseTable);
  return { myMenus, exercises };
}

export async function action({ context, request }: Route.ActionArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (!sessionUser) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const db = buildDbClient(context.cloudflare.env);
  const formData = await request.formData();

  const intent = formData.get("intent");

  // 削除アクションの場合
  if (intent === "delete") {
    const menuId = String(formData.get("menuId"));
    if (!menuId) {
      return { error: "メニューIDが指定されていません" };
    }

    // 指定したメニューが現在のユーザーのものであることを確認
    const menu = await db
      .select()
      .from(trainingMenuTable)
      .where(eq(trainingMenuTable.id, menuId))
      .limit(1);

    if (menu.length === 0 || menu[0].userId !== sessionUser.id) {
      return { error: "削除権限がないか、メニューが存在しません" };
    }

    // メニューを削除
    await db.delete(trainingMenuTable).where(eq(trainingMenuTable.id, menuId));

    return { ok: true, action: "delete", menuId };
  }
  const submission = parseWithZod(formData, { schema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { exerciseId, menuName, sets, reps, time } = submission.value;

  // メニュー作成
  await db.insert(trainingMenuTable).values({
    userId: sessionUser.id,
    exerciseId,
    menuName,
    sets,
    reps_per_set: reps,
    time_per_set: time,
  });

  return { ok: true };
}

export default function Menus({ loaderData }: Route.ComponentProps) {
  const { myMenus, exercises } = loaderData;

  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">マイメニューの管理</div>
        {/* メニュー作成用モーダル */}
        <MenuCreateModal exercises={exercises} />
      </div>

      {/* メニューの切り替えタブ */}
      <MenuTabs />

      {/* マイメニューの一覧 */}
      <MenuList myMenus={myMenus} exercises={exercises} />
    </div>
  );
}
