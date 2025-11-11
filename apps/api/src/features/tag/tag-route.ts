import { Hono } from "hono";

const tag = new Hono();

tag.get("/", (c) => {
  return c.json({ message: "Tag route is working!" });
});

export default tag;
