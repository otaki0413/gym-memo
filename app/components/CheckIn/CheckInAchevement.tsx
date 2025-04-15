import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CheckInAchievement = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">これまでのジム実績</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div>連続出勤日数: {50}日</div>
        <div>通算出勤日数: {50}日</div>
      </CardContent>
    </Card>
  );
};
