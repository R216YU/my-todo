import { defineConfig, mergeConfig } from "vitest/config";
import nodeConfig from "@repo/vitest-config/node";

export default mergeConfig(
  nodeConfig,
  defineConfig({
    // API固有の設定
    resolve: {
      alias: {
        "@": "./src",
      },
    },

    test: {
      // テストファイルのパターン（API固有）
      include: [
        "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}",
        "src/tests/**/*.{js,mjs,cjs,ts,mts,cts}",
      ],

      // 環境変数（API固有）
      env: {
        NODE_ENV: "test",
        DATABASE_URL:
          process.env.TEST_DATABASE_URL ||
          "postgresql://test:test@localhost:5432/test",
      },
    },
  })
);
