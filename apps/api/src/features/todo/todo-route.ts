import { Hono } from "hono";

import { handleError } from "@/shared/utils/error-handler";
import { validate } from "@/shared/utils/validator";

import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from "./todo-repository";
import {
  CreateTodoSchema,
  createTodoSchema,
  DeleteTodoSchema,
  deleteTodoSchema,
  GetTodoByIdSchema,
  getTodoByIdSchema,
  UpdateTodoSchema,
  updateTodoSchema,
} from "./todo-schema";

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
    const { param } = await validate(c, getTodoByIdSchema);
    const { id } = param;

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

todo.post("/", async (c) => {
  try {
    const { body } = await validate(c, createTodoSchema);
    const { title, description, priority, dueDate } =
      body as CreateTodoSchema["body"];

    const newTodo = await createTodo(title, description, priority, dueDate);

    return c.json({
      success: true,
      data: newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

todo.put("/:id", async (c) => {
  try {
    const { param, body } = await validate(c, updateTodoSchema);
    const { id } = param as UpdateTodoSchema["param"];
    const { title, description, priority, dueDate } =
      body as UpdateTodoSchema["body"];

    const updatedTodo = await updateTodoById(
      id,
      title,
      description,
      priority,
      dueDate
    );

    return c.json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

todo.delete("/:id", async (c) => {
  try {
    const { param } = await validate(c, deleteTodoSchema);
    const { id } = param as DeleteTodoSchema["param"];

    await deleteTodoById(id);

    return c.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

export default todo;
