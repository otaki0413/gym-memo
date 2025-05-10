import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { TZDate } from "@date-fns/tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date | string,
  formatString = "yyyy-MM-dd",
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
}

export function formatInJST(
  utcString: string,
  formatString = "yyyy-MM-dd HH:mm:ss",
): string {
  const utcDate = new Date(utcString + "Z");
  const jstDate = new TZDate(utcDate, "Asia/Tokyo");
  return format(jstDate, formatString);
}
