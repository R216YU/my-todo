import { z } from "zod";

/**
 * ID指定でTagを取得するスキーマ
 */
export const getTagByIdSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
});

export type GetTagByIdSchema = z.infer<typeof getTagByIdSchema>;

/**
 * Tag作成スキーマ
 */
export const createTagSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    color: z.string().min(1).optional(),
  }),
});

export type CreateTagSchema = z.infer<typeof createTagSchema>;

/**
 * ID指定でTagを更新するスキーマ
 */
export const updateTagSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    color: z.string().min(1).optional(),
  }),
});

export type UpdateTagSchema = z.infer<typeof updateTagSchema>;

/**
 * ID指定でTagを削除するスキーマ
 */
export const deleteTagSchema = z.object({
  param: z.object({
    id: z.string().min(1),
  }),
});

export type DeleteTagSchema = z.infer<typeof deleteTagSchema>;
