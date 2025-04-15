import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { addDays } from "date-fns";

export const CheckInCalendar = () => {
  const today = new Date();
  const [date, _] = useState<Date[] | undefined>([
    addDays(today, 2),
    addDays(today, 6),
    addDays(today, 8),
  ]);

  return (
    <Calendar
      mode="default"
      selected={date}
      className="flex justify-center rounded-md bg-white shadow sm:justify-start"
    />
  );
};
