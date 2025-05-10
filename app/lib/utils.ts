import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
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
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
}

/**
 * UTCの日付文字列をJSTに変換する
 * @param utcString - UTC形式の日付文字列
 * @returns JSTのDateオブジェクト
 */
export function convertToJSTDate(utcString: string): Date {
  const utcDate = new Date(utcString + "Z");
  const jstDate = new TZDate(utcDate, "Asia/Tokyo");
  return jstDate;
}

/**
 * UTCの日付文字列をJSTのフォーマットでフォーマットする
 * @param dateString - UTC形式の日付文字列
 * @param formatString - 日付のフォーマット形式
 * @returns フォーマットされたJST日付文字列
 */
export function formatInJST(
  dateString: string,
  formatString = "yyyy-MM-dd HH:mm:ss",
): string {
  const jstDate = convertToJSTDate(dateString);
  return format(jstDate, formatString);
}
