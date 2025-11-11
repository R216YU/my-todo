import { Hono } from "hono";
import { getAllTodos, getTodoById } from "./todo-repository";
import { handleError } from "@/shared/utils/error-handler";

const todo = new Hono();

todo.get("/", async (c) => {
  try {
    const todos = await getAllTodos();

    return c.json({
      success: true,
      data: todos,
      message: "Todos retrieved successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

todo.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const todo = await getTodoById(id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    return c.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    return handleError(c, error);
  }
});

todo.post("/", (c) => {});

export default todo;
