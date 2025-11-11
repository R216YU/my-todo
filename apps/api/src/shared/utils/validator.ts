import { Context } from "hono";
import { ZodObject } from "zod";

export const validate = async (c: Context, schema: ZodObject) => {
  // パスパラメーター param
  const param = c.req.param();
  const paramSchema = schema.shape.params;

  // クエリパラメーター query
  const query = c.req.query();
  const querySchema = schema.shape.query;

  // リクエストパラメーター json
  const body = await c.req.json();
  const bodySchema = schema.shape.body;

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
