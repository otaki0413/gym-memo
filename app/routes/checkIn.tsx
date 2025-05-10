import type { Route } from "./+types/checkIn";
import { and, eq } from "drizzle-orm";
import { CheckInCalendar } from "~/components/CheckIn/CheckInCalendar";
import { CheckInAchievement } from "~/components/CheckIn/CheckInAchievement";
import { CheckInPanel } from "~/components/CheckIn/CheckInPanel";
import { getSessionUser } from "~/services/session.server";
import { buildDbClient } from "~/db/client.server";
import { checkInTable } from "~/db/schema";
import { formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (!sessionUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // DBクライアント作成
  const db = buildDbClient(context.cloudflare.env);

  // すべてのチェックイン履歴
  const allCheckInDate = await db
    .select()
    .from(checkInTable)
    .where(eq(checkInTable.userId, sessionUser.id));

  // 今日の日付
  const fmtToday = formatDate(new Date(), "yyyy-MM-dd");

  // チェックイン履歴が存在する場合、チェックイン日付を取得
  const checkInInfo =
    allCheckInDate.length > 0
      ? allCheckInDate.find((checkIn) => checkIn.checkInDate === fmtToday)
      : undefined;

  // 今日チェックイン済みかどうか
  const isTodayCheckIn = allCheckInDate.some(
    (checkIn) => checkIn.checkInDate === fmtToday,
  );

  // デバッグ用
  console.log("今日の日付:", fmtToday);
  console.log("チェックイン履歴:", allCheckInDate);
  console.log("今日のチェックイン履歴:", checkInInfo);
  console.log("今日チェックイン済み:", isTodayCheckIn);

  return { user: sessionUser, allCheckInDate, checkInInfo, isTodayCheckIn };
}

export async function action({ context, request }: Route.ActionArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (!sessionUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  console.log("チェックイン処理を実行します");
  // 1秒待機（デモ用）
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // DBクライアント作成
  const db = buildDbClient(context.cloudflare.env);
  // フォーマットした今日の日付を取得
  const fmtToday = formatDate(new Date(), "yyyy-MM-dd");
  // レコードの存在確認
  const existingCheckIn = await db
    .select()
    .from(checkInTable)
    .where(
      and(
        eq(checkInTable.userId, sessionUser.id),
        eq(checkInTable.checkInDate, fmtToday),
      ),
    )
    .get();

  // すでにチェックイン済みの場合、何もしない
  if (existingCheckIn) {
    console.log("すでにチェックイン済みです");
    return null;
  }

  // 新規チェックインレコードの作成
  try {
    const newCheckIn = await db
      .insert(checkInTable)
      .values({ userId: sessionUser.id, checkInDate: fmtToday })
      .returning()
      .get();
    console.log("✅ New checkIn created:", newCheckIn);
    console.log("チェックイン処理を実行しました！");
  } catch (error) {
    console.log("Error creating checkIn", error);
    throw new Error("CheckIn failed, please try again");
  }
}

// チェックインページ
export default function CheckIn({ loaderData }: Route.ComponentProps) {
  const { user, allCheckInDate, checkInInfo, isTodayCheckIn } = loaderData;
  return (
    <div className="space-y-2 p-3">
      <CheckInPanel
        user={user}
        checkInInfo={checkInInfo}
        isTodayCheckIn={isTodayCheckIn}
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <CheckInAchievement allCheckInDate={allCheckInDate} />
        <CheckInCalendar allCheckInDate={allCheckInDate} />
      </div>
    </div>
  );
}
