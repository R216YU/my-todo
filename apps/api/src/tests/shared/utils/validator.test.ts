import { describe, it, expect } from "vitest";
import { asyncTestUtils, mockDataUtils } from "@repo/vitest-config/test-utils";

describe("Validator Test", () => {
  it("should test async utils", async () => {
    // 非同期処理のテスト
    const start = Date.now();
    await asyncTestUtils.sleep(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(90);
  });

  it("should test mock data utils", () => {
    // モックデータのテスト
    const randomStr = mockDataUtils.randomString(10);
    expect(randomStr).toHaveLength(10);

    const randomNum = mockDataUtils.randomNumber(1, 5);
    expect(randomNum).toBeGreaterThanOrEqual(1);
    expect(randomNum).toBeLessThanOrEqual(5);

    const randomBool = mockDataUtils.randomBoolean();
    expect(typeof randomBool).toBe("boolean");
  });
});
