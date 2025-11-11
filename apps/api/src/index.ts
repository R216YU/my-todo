import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import todo from "./routes/todo";
import tag from "./routes/tag";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ success: true, message: "API is working!" });
});

app.route("/todo", todo);
app.route("/tag", tag);

export const handler = handle(app);
