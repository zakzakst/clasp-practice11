/**
 * Dateオブジェクトをyyyy-MM-dd形式に変換
 * @param date Dateオブジェクト
 * @returns 変換した文字列
 */
export const formatDate_ = (date: Date): string => {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
};

/**
 * シートの値をDateに変換
 * @param value 変換する値
 * @returns 変換後のDate（変換できない場合は null）
 */
export const parseDate_ = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return value;
  }
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
