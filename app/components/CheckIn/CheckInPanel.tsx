import { useFetcher } from "react-router";
import { CircleCheckBig, CircleDotDashed, LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import type { SessionUser } from "~/services/auth.server";
import type { SelectCheckIn } from "~/db/schema";
import { convertToJSTDate, formatDate } from "~/lib/utils";

type CheckInPanelProps = {
  user?: SessionUser;
  checkInInfo?: SelectCheckIn;
  isTodayCheckIn: boolean;
};

export const CheckInPanel: React.FC<CheckInPanelProps> = ({
  user,
  checkInInfo,
  isTodayCheckIn = false,
}) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  // チェックイン日時をUTCからJSTに変換
  const checkInTimeJST = checkInInfo?.createdAt
    ? formatDate(convertToJSTDate(checkInInfo.createdAt), "M月d日 HH時mm分ss秒")
    : "";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {user ? user.displayName : "ゲスト"}さん、ようこそ！
        </CardTitle>
        <CardDescription className="break-words">
          ジムに到着したらすぐチェックインしましょう！
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {isTodayCheckIn ? (
          <div className="flex w-full gap-x-2">
            <Button className="flex-4/5 font-semibold" disabled>
              <CircleCheckBig />
              チェックイン完了
              <span className="ml-1">{checkInTimeJST}</span>
            </Button>
            <fetcher.Form method="POST" className="flex-1">
              <input type="hidden" name="intent" value="deleteCheckIn" />
              <Button
                type="submit"
                variant="destructive"
                className="flex-1 cursor-pointer font-semibold"
              >
                解除
              </Button>
            </fetcher.Form>
          </div>
        ) : (
          <fetcher.Form method="POST" className="w-full">
            <Button
              className="w-full cursor-pointer font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  チェックイン中
                </>
              ) : (
                <>
                  <CircleDotDashed />
                  本日のチェックイン
                </>
              )}
            </Button>
          </fetcher.Form>
        )}
      </CardContent>
    </Card>
  );
};
