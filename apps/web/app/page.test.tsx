import { describe, it, expect } from "vitest";
import { mockDataUtils } from "@repo/vitest-config/test-utils";

describe("Web Component Test", () => {
  it("should test mock data utils for web", () => {
    // Webアプリケーション用のテスト
    const mockUser = {
      id: mockDataUtils.randomNumber(1, 1000),
      name: mockDataUtils.randomString(8),
      email: `${mockDataUtils.randomString(5)}@example.com`,
      isActive: mockDataUtils.randomBoolean(),
      createdAt: mockDataUtils.randomDate(),
    };

    expect(mockUser.id).toBeGreaterThanOrEqual(1);
    expect(mockUser.id).toBeLessThanOrEqual(1000);
    expect(mockUser.name).toHaveLength(8);
    expect(mockUser.email).toContain("@example.com");
    expect(typeof mockUser.isActive).toBe("boolean");
    expect(mockUser.createdAt).toBeInstanceOf(Date);
  });
});
