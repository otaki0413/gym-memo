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
 * UTCの日付文字列を指定したタイムゾーンに変換する
 * @param utcString - UTC形式の日付文字列（"YYYY-MM-DD HH:MM:SS"の形式が前提）
 * @param timeZone - タイムゾーン（例："Asia/Tokyo", "UTC"など）
 * @returns タイムゾーンに基づくTZDateオブジェクト
 */
export function convertToLocalDate(utcString: string, timeZone?: string): Date {
  try {
    // ISO形式への正規化（"YYYY-MM-DD HH:MM:SS" -> "YYYY-MM-DDTHH:MM:SSZ"）
    const normalized = utcString.replace(" ", "T").replace(/Z?$/, "Z");
    const utcDate = new Date(normalized);

    // 日付の有効性チェック
    if (!isValid(utcDate)) {
      throw new Error("Invalid UTC date string");
    }
    // タイムゾーンに基づいてTZDateを作成（なければローカルタイムゾーンを使用）
    const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    return new TZDate(utcDate, zone);
  } catch (error) {
    console.error("Date conversion error:", error);
    throw error;
  }
}
