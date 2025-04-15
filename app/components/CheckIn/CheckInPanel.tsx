import { CircleCheckBig } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export const CheckInPanel = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">チェックイン</CardTitle>
        <CardDescription className="break-words">
          ジムに到着したらすぐチェックインしましょう！
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button className="w-full cursor-pointer font-semibold">
          <CircleCheckBig />
          今日のチェックイン
        </Button>
      </CardContent>
    </Card>
  );
};
