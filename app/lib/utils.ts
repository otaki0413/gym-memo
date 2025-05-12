import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";
import { TZDate } from "@date-fns/tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付を指定したフォーマットでフォーマットする
 * @param date - 日付（Date型またはISO形式の文字列）
 * @param formatString - 日付のフォーマット形式
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  date: Date | string,
  formatString = "yyyy-MM-dd",
): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      throw new Error("Invalid date format");
    }
    return format(dateObj, formatString);
  } catch (error) {
    console.error("Date formatting error:", error);
    throw error;
  }
}

/**
 * UTCの日付文字列をJSTに変換する
 * @param utcString - UTC形式の日付文字列
 * @returns JSTのDateオブジェクト
 */
export function convertToJSTDate(utcString: string): Date {
  try {
    const utcDate = new Date(utcString + "Z");
    if (!isValid(utcDate)) {
      throw new Error("Invalid UTC date string");
    }
    const jstDate = new TZDate(utcDate, "Asia/Tokyo");
    return jstDate;
  } catch (error) {
    console.error("Date conversion error:", error);
    throw error;
  }
}
