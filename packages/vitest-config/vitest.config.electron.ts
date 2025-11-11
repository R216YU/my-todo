import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "./vitest.config.base.js";

/**
 * Electron/Desktop アプリケーション用のVitest設定
 * Electron、Tauri等のデスクトップアプリケーション向け
 */
export const electronConfig = defineConfig({
  test: {
    environment: "jsdom",

    // Electron Testing Library等のセットアップ
    setupFiles: [],

    // デスクトップ環境のモック
    globals: true,

    // 環境変数設定
    env: {
      NODE_ENV: "test",
      ELECTRON_IS_DEV: "1",
    },

    // Electron特有のファイルの除外
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/coverage/**",
      "**/release/**",
    ],
  },

  // Electron用エイリアス
  resolve: {
    alias: {
      "@": "./src",
      "~/": "./src/",
      "@/components": "./src/components",
      "@/windows": "./src/windows",
      "@/main": "./src/main",
      "@/renderer": "./src/renderer",
      "@/preload": "./src/preload",
      "@/hooks": "./src/hooks",
      "@/services": "./src/services",
      "@/types": "./src/types",
      "@/utils": "./src/utils",
    },
  },

  // Electron特有の設定
  define: {
    "process.env": "process.env",
    __dirname: "__dirname",
    __filename: "__filename",
  },
});

export default mergeConfig(baseConfig, electronConfig);
