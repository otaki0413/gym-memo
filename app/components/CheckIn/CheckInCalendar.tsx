import { Calendar } from "../ui/calendar";
import type { SelectCheckIn } from "~/db/schema";
import { convertToLocalDate } from "~/lib/utils";

type CheckInCalendarProps = {
  checkInHistory: SelectCheckIn[];
};

export const CheckInCalendar: React.FC<CheckInCalendarProps> = ({
  checkInHistory,
}) => {
  // カレンダーに表示する日付リスト（UTCから日本時間に変換）
  const dateList: Date[] = checkInHistory.map((checkIn) =>
    convertToLocalDate(checkIn.checkInAt, "Asia/Tokyo"),
  );

  return (
    <Calendar
      mode="default"
      selected={dateList}
      className="flex justify-center rounded-md bg-white shadow sm:justify-start"
    />
  );
};
