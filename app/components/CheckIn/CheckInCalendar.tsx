import { Calendar } from "../ui/calendar";
import type { SelectCheckIn } from "~/db/schema";
import { convertToLocalDate } from "~/lib/utils";

// カレンダーに表示用のダミーデータ
// const DUMMY_DATE_LIST: Date[] = [
//   new Date("2025-05-01T00:00:00+09:00"),
//   new Date("2025-05-02T00:00:00+09:00"),
//   new Date("2025-05-03T00:00:00+09:00"),
//   new Date("2025-05-04T00:00:00+09:00"),
//   new Date("2025-05-05T00:00:00+09:00"),
// ];

type CheckInCalendarProps = {
  checkInHistory: SelectCheckIn[];
};

export const CheckInCalendar: React.FC<CheckInCalendarProps> = ({
  checkInHistory,
}) => {
  // カレンダーに表示する日付リスト（UTCから日本時間に変換）
  const dateList: Date[] = checkInHistory.map((checkIn) =>
    convertToLocalDate(checkIn.checkInDate, "Asia/Tokyo"),
  );

  return (
    <Calendar
      mode="default"
      selected={dateList}
      className="flex justify-center rounded-md bg-white shadow sm:justify-start"
    />
  );
};
