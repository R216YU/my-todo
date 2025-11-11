/**
 * 共通テストユーティリティ
 * 全てのアプリケーションで使用可能なヘルパー関数とマッチャー
 */

/**
 * 非同期処理のテスト用ヘルパー
 */
export const asyncTestUtils = {
  /**
   * 指定された時間待機
   * @param ms - 待機時間（ミリ秒）
   */
  sleep: (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * 条件が満たされるまで待機
   * @param condition - 条件を返す関数
   * @param timeout - タイムアウト時間（ミリ秒）
   * @param interval - チェック間隔（ミリ秒）
   */
  waitFor: async (
    condition: () => boolean | Promise<boolean>,
    timeout = 5000,
    interval = 100
  ): Promise<void> => {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (await condition()) {
        return;
      }
      await asyncTestUtils.sleep(interval);
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  },
};

/**
 * モックデータ生成ユーティリティ
 */
export const mockDataUtils = {
  /**
   * ランダムな文字列を生成
   * @param length - 文字列の長さ
   */
  randomString: (length = 10): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * ランダムな数値を生成
   * @param min - 最小値
   * @param max - 最大値
   */
  randomNumber: (min = 0, max = 100): number =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  /**
   * ランダムなブール値を生成
   */
  randomBoolean: (): boolean => Math.random() < 0.5,

  /**
   * ランダムな日付を生成
   * @param start - 開始日
   * @param end - 終了日
   */
  randomDate: (start?: Date, end?: Date): Date => {
    const startDate = start || new Date(2020, 0, 1);
    const endDate = end || new Date();
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
  },
};

/**
 * APIテスト用ユーティリティ
 */
export const apiTestUtils = {
  /**
   * APIレスポンスの基本構造をチェック
   * @param response - レスポンスオブジェクト
   */
  expectApiResponse: (response: any) => ({
    toHaveStatus: (expectedStatus: number) => {
      expect(response.status).toBe(expectedStatus);
    },
    toHaveProperty: (property: string) => {
      expect(response).toHaveProperty(property);
    },
    toMatchSchema: (schema: any) => {
      // スキーマバリデーション（実装は使用するライブラリに依存）
      // 例: zodスキーマを使用する場合
      expect(() => schema.parse(response)).not.toThrow();
    },
  }),

  /**
   * エラーレスポンスの構造をチェック
   * @param error - エラーオブジェクト
   */
  expectApiError: (error: any) => ({
    toHaveStatusCode: (expectedCode: number) => {
      expect(error.status || error.statusCode).toBe(expectedCode);
    },
    toHaveMessage: (expectedMessage: string | RegExp) => {
      if (typeof expectedMessage === "string") {
        expect(error.message).toBe(expectedMessage);
      } else {
        expect(error.message).toMatch(expectedMessage);
      }
    },
  }),
};

/**
 * データベーステスト用ユーティリティ
 */
export const dbTestUtils = {
  /**
   * テストデータをクリーンアップ
   * @param cleanup - クリーンアップ関数
   */
  withCleanup: <T>(cleanup: () => Promise<void> | void) => {
    return async (testFn: () => Promise<T> | T): Promise<T> => {
      try {
        return await testFn();
      } finally {
        await cleanup();
      }
    };
  },

  /**
   * トランザクション内でテストを実行
   * @param transactionFn - トランザクション実行関数
   */
  withTransaction: <T>(transactionFn: (fn: () => Promise<T>) => Promise<T>) => {
    return transactionFn;
  },
};

/**
 * 環境変数テスト用ユーティリティ
 */
export const envTestUtils = {
  /**
   * 環境変数を一時的に設定してテストを実行
   * @param envVars - 設定する環境変数
   * @param testFn - テスト関数
   */
  withEnv: async <T>(
    envVars: Record<string, string | undefined>,
    testFn: () => Promise<T> | T
  ): Promise<T> => {
    const originalEnv = { ...process.env };

    try {
      Object.assign(process.env, envVars);
      return await testFn();
    } finally {
      process.env = originalEnv;
    }
  },
};

/**
 * 共通テストセットアップ関数
 */
export const setupTestUtils = {
  /**
   * 基本的なテスト環境をセットアップ
   */
  setupBasic: () => {
    // グローバルなセットアップ処理
    beforeEach(() => {
      // 各テスト前に実行される処理
    });

    afterEach(() => {
      // 各テスト後に実行される処理
      vi?.clearAllMocks?.();
    });
  },

  /**
   * タイムアウト設定を行う
   * @param timeout - タイムアウト時間（ミリ秒）
   */
  setupTimeout: (timeout: number) => {
    vi?.setConfig?.({ testTimeout: timeout, hookTimeout: timeout });
  },
};
