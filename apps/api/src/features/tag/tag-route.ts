import { Hono } from "hono";

import { handleError } from "@/shared/utils/error-handler";
import { validate } from "@/shared/utils/validator";

import {
  createTag,
  deleteTagById,
  getAllTags,
  getTagById,
  updateTagById,
} from "./tag-repository";
import {
  CreateTagSchema,
  createTagSchema,
  DeleteTagSchema,
  deleteTagSchema,
  GetTagByIdSchema,
  getTagByIdSchema,
  UpdateTagSchema,
  updateTagSchema,
} from "./tag-schema";

const tag = new Hono();

tag.get("/", async (c) => {
  try {
    const tags = await getAllTags();

    return c.json({
      success: true,
      data: tags,
      message: "Tags retrieved successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

tag.get("/:id", async (c) => {
  try {
    const { param } = await validate(c, getTagByIdSchema);
    const { id } = param;

    const tag = await getTagById(id);

    if (!tag) {
      throw new Error("Tag not found");
    }

    return c.json({
      success: true,
      data: tag,
    });
  } catch (error) {
    return handleError(c, error);
  }
});

tag.post("/", async (c) => {
  try {
    const { body } = await validate(c, createTagSchema);
    const { title, color } = body as CreateTagSchema["body"];

    const newTag = await createTag(title, color);

    return c.json({
      success: true,
      data: newTag,
      message: "Tag created successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

tag.put("/:id", async (c) => {
  try {
    const { param, body } = await validate(c, updateTagSchema);
    const { id } = param as UpdateTagSchema["param"];
    const { title, color } = body as UpdateTagSchema["body"];

    const updatedTag = await updateTagById(id, title, color);

    return c.json({
      success: true,
      data: updatedTag,
      message: "Tag updated successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

tag.delete("/:id", async (c) => {
  try {
    const { param } = await validate(c, deleteTagSchema);
    const { id } = param as DeleteTagSchema["param"];

    await deleteTagById(id);

    return c.json({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    return handleError(c, error);
  }
});

export default tag;
