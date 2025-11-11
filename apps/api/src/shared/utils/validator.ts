import { Context } from "hono";
import { ZodObject } from "zod";

/**
 * HonoのContextオブジェクトを指定されたZodスキーマでバリデーションする
 * @param c
 * @param schema
 * @returns param, query, bodyの各パラメーターを含むオブジェクト
 */
export const validate = async (
  c: Context,
  schema: ZodObject
): Promise<{ param: any; query: any; body: any }> => {
  // パスパラメーター param
  const param = c.req.param();
  const paramSchema = schema.shape.param;

  // クエリパラメーター query
  const query = c.req.query();
  const querySchema = schema.shape.query;

  // リクエストパラメーター json
  let body = {};
  const bodySchema = schema.shape.body;
  if (bodySchema) {
    try {
      body = await c.req.json();
    } catch (error) {
      body = {};
    }
  }

  // バリデーションを実行
  const paramResult = paramSchema ? paramSchema.parse(param) : {};
  const queryResult = querySchema ? querySchema.parse(query) : {};
  const bodyResult = bodySchema ? bodySchema.parse(body) : {};

  return {
    param: paramResult,
    query: queryResult,
    body: bodyResult,
  };
};
