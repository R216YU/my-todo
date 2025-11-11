import { describe, it, expect, vi } from "vitest";
import { Context } from "hono";
import { z } from "zod";
import { validate } from "../../../shared/utils/validator";

// モックContext作成用のヘルパー関数
const createMockContext = (
  param: Record<string, string> = {},
  query: Record<string, string> = {},
  body: any = {}
): Context => {
  const mockRequest = {
    param: vi.fn(() => param),
    query: () => query,
    json: vi.fn(async () => body),
  };

  return {
    req: mockRequest,
  } as unknown as Context;
};

describe("validate関数のテスト", () => {
  describe("正常系", () => {
    it("paramのみ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        params: z.object({
          id: z.string().min(1),
        }),
      });
      const mockContext = createMockContext({ id: "123" });

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: { id: "123" },
        query: {},
        body: {},
      });
    });

    it("queryのみ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        query: z.object({
          page: z.string().optional(),
          limit: z.string().optional(),
        }),
      });
      const mockContext = createMockContext({}, { page: "1", limit: "10" });

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: {},
        query: { page: "1", limit: "10" },
        body: {},
      });
    });

    it("bodyのみ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        body: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });
      const requestBody = { name: "John", age: 30 };
      const mockContext = createMockContext({}, {}, requestBody);

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: {},
        query: {},
        body: requestBody,
      });
    });

    it("param + query + bodyの組み合わせ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        params: z.object({
          id: z.string(),
        }),
        query: z.object({
          include: z.string().optional(),
        }),
        body: z.object({
          title: z.string(),
          completed: z.boolean(),
        }),
      });
      const requestBody = { title: "Test Todo", completed: false };
      const mockContext = createMockContext(
        { id: "456" },
        { include: "tags" },
        requestBody
      );

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: { id: "456" },
        query: { include: "tags" },
        body: requestBody,
      });
    });

    it("param + queryの組み合わせ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        params: z.object({
          userId: z.string(),
        }),
        query: z.object({
          sort: z.string().optional(),
        }),
      });
      const mockContext = createMockContext(
        { userId: "789" },
        { sort: "created_at" }
      );

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: { userId: "789" },
        query: { sort: "created_at" },
        body: {},
      });
    });

    it("param + bodyの組み合わせ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        params: z.object({
          todoId: z.string(),
        }),
        body: z.object({
          title: z.string(),
        }),
      });
      const requestBody = { title: "Updated Todo" };
      const mockContext = createMockContext({ todoId: "101" }, {}, requestBody);

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: { todoId: "101" },
        query: {},
        body: requestBody,
      });
    });

    it("query + bodyの組み合わせ - 正常にバリデーションを実行する", async () => {
      // Arrange
      const schema = z.object({
        query: z.object({
          format: z.string().optional(),
        }),
        body: z.object({
          data: z.array(z.string()),
        }),
      });
      const requestBody = { data: ["item1", "item2"] };
      const mockContext = createMockContext(
        {},
        { format: "json" },
        requestBody
      );

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: {},
        query: { format: "json" },
        body: requestBody,
      });
    });
  });

  describe("異常系", () => {
    it("param, query, bodyがない場合 - 空のオブジェクトを返す", async () => {
      // Arrange
      const schema = z.object({});
      const mockContext = createMockContext();

      // Act
      const result = await validate(mockContext, schema);

      // Assert
      expect(result).toEqual({
        param: {},
        query: {},
        body: {},
      });
    });

    it("必須パラメーターが不足している場合 - ZodErrorが投げられる", async () => {
      // Arrange
      const schema = z.object({
        params: z.object({
          id: z.string().min(1),
        }),
      });
      const mockContext = createMockContext({}); // idが空

      // Act & Assert
      await expect(validate(mockContext, schema)).rejects.toThrow();
    });

    it("バリデーション要求値が型に合わない場合 - ZodErrorが投げられる", async () => {
      // Arrange
      const schema = z.object({
        body: z.object({
          age: z.number(),
        }),
      });
      const requestBody = { age: "not a number" };
      const mockContext = createMockContext({}, {}, requestBody);

      // Act & Assert
      await expect(validate(mockContext, schema)).rejects.toThrow();
    });

    it("クエリパラメーターの値が不正な場合 - ZodErrorが投げられる", async () => {
      // Arrange
      const schema = z.object({
        query: z.object({
          page: z.string().regex(/^\d+$/, "page must be a number"),
        }),
      });
      const mockContext = createMockContext({}, { page: "invalid" });

      // Act & Assert
      await expect(validate(mockContext, schema)).rejects.toThrow();
    });

    it("JSONパースに失敗した場合 - エラーが投げられる", async () => {
      // Arrange
      const schema = z.object({
        body: z.object({
          name: z.string(),
        }),
      });
      const mockContext = {
        req: {
          param: vi.fn(() => ({})),
          query: () => ({}),
          json: vi.fn(() => Promise.reject(new Error("Invalid JSON"))),
        },
      } as unknown as Context;

      // Act & Assert
      await expect(validate(mockContext, schema)).rejects.toThrow(
        "Invalid JSON"
      );
    });
  });
});
