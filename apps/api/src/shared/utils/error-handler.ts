import { Context } from "hono";

/**
 * エラーハンドリングを一元的に行う関数
 * @param c Contextオブジェクト
 * @param error エラーオブジェクト
 * @returns エラーレスポンス
 */
export const handleError = (c: Context, error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  c.status(500);

  return c.json({
    success: false,
    message,
  });
};
