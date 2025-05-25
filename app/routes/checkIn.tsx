import type { Route } from "./+types/checkIn";
import { and, eq } from "drizzle-orm";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { CheckInCalendar } from "~/components/CheckIn/CheckInCalendar";
import { CheckInAchievement } from "~/components/CheckIn/CheckInAchievement";
import { CheckInPanel } from "~/components/CheckIn/CheckInPanel";
import { getSessionUser } from "~/services/session.server";
import { buildDbClient } from "~/db/client.server";
import { checkInTable } from "~/db/schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "チェックイン" },
    { name: "description", content: "チェックインページです" },
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
  const checkInHistory = await db
    .select()
    .from(checkInTable)
    .where(eq(checkInTable.userId, sessionUser.id));

  // 今日の日付（UTC形式）をフォーマット
  const fmtToday = format(new UTCDate(), "yyyy-MM-dd");

  // 今日のチェックイン情報
  const checkInInfo =
    checkInHistory.length > 0
      ? checkInHistory.find((checkIn) => checkIn.checkInDate === fmtToday)
      : undefined;

  // 今日チェックイン済みかどうか
  const isTodayCheckIn = checkInHistory.some(
    (checkIn) => checkIn.checkInDate === fmtToday,
  );

  return { user: sessionUser, checkInHistory, checkInInfo, isTodayCheckIn };
}

export async function action({ context, request }: Route.ActionArgs) {
  const { sessionUser } = await getSessionUser(request);
  if (!sessionUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  // DBクライアント作成
  const db = buildDbClient(context.cloudflare.env);

  // 今日の日付（UTC形式）をフォーマット
  const fmtToday = format(new UTCDate(), "yyyy-MM-dd");

  if (intent === "deleteCheckIn") {
    // チェックイン解除処理
    try {
      await db
        .delete(checkInTable)
        .where(
          and(
            eq(checkInTable.userId, sessionUser.id),
            eq(checkInTable.checkInDate, fmtToday),
          ),
        )
        .run();
      console.log("✅ CheckIn deleted");
      return null;
    } catch (error) {
      console.log("Error deleting checkIn", error);
      throw new Error("CheckIn deletion failed, please try again");
    }
  }

  console.log("チェックイン処理を実行します");
  // 1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
  const { user, checkInHistory, checkInInfo, isTodayCheckIn } = loaderData;
  return (
    <div className="space-y-2 p-3">
      <CheckInPanel
        user={user}
        checkInInfo={checkInInfo}
        isTodayCheckIn={isTodayCheckIn}
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <CheckInAchievement checkInHistory={checkInHistory} />
        <CheckInCalendar checkInHistory={checkInHistory} />
      </div>
    </div>
  );
}
