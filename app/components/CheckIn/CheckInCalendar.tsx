import { Calendar } from "../ui/calendar";
import type { SelectCheckIn } from "~/db/schema";
import { convertToJSTDate } from "~/lib/utils";

// カレンダーに表示用のダミーデータ
// const DUMMY_DATE_LIST: Date[] = [
//   new Date("2025-05-01T00:00:00+09:00"),
//   new Date("2025-05-02T00:00:00+09:00"),
//   new Date("2025-05-03T00:00:00+09:00"),
//   new Date("2025-05-04T00:00:00+09:00"),
//   new Date("2025-05-05T00:00:00+09:00"),
// ];

type CheckInCalendarProps = {
  allCheckInDate: SelectCheckIn[];
};

export const CheckInCalendar: React.FC<CheckInCalendarProps> = ({
  allCheckInDate,
}) => {
  // カレンダーに表示する日付リスト
  const dateList: Date[] = allCheckInDate.map((checkIn) => {
    // UTCからJSTに変換する
    return convertToJSTDate(checkIn.checkInDate);
  });

  return (
    <Calendar
      mode="default"
      selected={dateList}
      className="flex justify-center rounded-md bg-white shadow sm:justify-start"
    />
  );
};
