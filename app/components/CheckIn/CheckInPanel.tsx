import { useFetcher } from "react-router";
import { CircleCheckBig, CircleDotDashed, LoaderCircle, X } from "lucide-react";
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
import { formatInJST } from "~/lib/utils";

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
    ? formatInJST(checkInInfo.createdAt, "yyyy-MM-dd HH:mm:ss")
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
            <fetcher.Form method="delete" className="flex-1">
              <Button
                variant="destructive"
                className="flex-auto cursor-pointer font-semibold"
              >
                <X />
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
