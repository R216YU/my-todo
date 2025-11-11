import { Priority } from "@repo/database";
import { z } from "zod";

/**
 * ID指定でTODOを取得するスキーマ
 */
export const getTodoByIdSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
});

export type GetTodoByIdSchema = z.infer<typeof getTodoByIdSchema>;

/**
 * TODO作成スキーマ
 */
export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"] as Priority[]),
    dueDate: z.date().optional(),
  }),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

/**
 * ID指定でTODOを更新するスキーマ
 */
export const updateTodoSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    priority: z
      .enum(["LOW", "MEDIUM", "HIGH", "URGENT"] as Priority[])
      .optional(),
    dueDate: z.date().optional(),
  }),
});

export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;

/**
 * ID指定でTODOを削除するスキーマ
 */
export const deleteTodoSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
});

export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>;
