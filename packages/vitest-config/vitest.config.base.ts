import { defineConfig } from "vitest/config";

/**
 * 基本的なVitest設定
 * すべてのアプリケーションで共通して使用される設定
 */
export const baseConfig = defineConfig({
  test: {
    // テストの実行環境
    environment: "node",

    // テストファイルのパターン
    include: [
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "**/tests/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],

    // 除外するファイル
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
    ],

    // グローバル設定
    globals: true,

    // カバレッジ設定
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "coverage/**",
        "dist/**",
        "packages/*/test?(s)/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
        "**/vitest.config.*",
        "**/next.config.*",
        "**/turbo.json",
        "**/package.json",
        "**/tsconfig.*",
      ],
    },

    // タイムアウト設定
    testTimeout: 10000,
    hookTimeout: 10000,

    // 並行実行設定
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },

    // ログ設定
    logHeapUsage: true,

    // ファイル変更時の監視設定
    watch: process.env.NODE_ENV !== "test",
  },

  // エイリアス設定（各アプリで上書き可能）
  resolve: {
    alias: {
      "@": "./src",
    },
  },

  // TypeScript設定
  define: {
    "import.meta.vitest": undefined,
  },
});

export default baseConfig;
