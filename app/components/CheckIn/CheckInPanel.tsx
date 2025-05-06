import { CircleCheckBig } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import type { SessionUser } from "~/services/auth.server";

type Props = {
  user?: SessionUser;
};

export const CheckInPanel: React.FC<Props> = ({ user }) => {
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
        <Button
          onClick={() => alert("TODO: チェックイン処理が行われます")}
          className="w-full cursor-pointer font-semibold"
        >
          <CircleCheckBig />
          今日のチェックイン
        </Button>
      </CardContent>
    </Card>
  );
};
