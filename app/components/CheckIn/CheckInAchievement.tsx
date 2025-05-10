import type { SelectCheckIn } from "~/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type CheckInAchievementProps = {
  allCheckInDate: SelectCheckIn[];
};

// TODO: ジムの実績として表示する内容はいったん保留
export const CheckInAchievement: React.FC<CheckInAchievementProps> = ({
  allCheckInDate,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">これまでのジム実績</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div>通算出勤日数: {allCheckInDate.length}日</div>
      </CardContent>
    </Card>
  );
};
