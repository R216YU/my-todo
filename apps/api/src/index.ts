import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { serve } from "@hono/node-server";
import todo from "./features/todo/todo-route";
import tag from "./features/tag/tag-route";

const app = new Hono();

// CORS設定
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (c.req.method === "OPTIONS") {
    return c.text("OK", 200);
  }
  await next();
});

app.get("/", (c) => {
  return c.json({ success: true, message: "API is working!" });
});

app.route("/todo", todo);
app.route("/tag", tag);

// AWS Lambda用のハンドラー
export const handler = handle(app);

// 開発環境用のサーバー起動
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  console.log(`Server is running on port http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

// 開発環境用のサーバー起動
export default app;
