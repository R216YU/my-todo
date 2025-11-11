import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "./vitest.config.base.js";

/**
 * React Native/Mobile アプリケーション用のVitest設定
 * React Native、Expo等のモバイルアプリケーション向け
 */
export const reactNativeConfig = defineConfig({
  test: {
    environment: "jsdom",

    // React Native Testing Library等のセットアップ
    setupFiles: [],

    // モバイル環境のモック
    globals: true,

    // 環境変数設定
    env: {
      NODE_ENV: "test",
      EXPO_ROUTER_IMPORT_MODE: "test",
    },

    // React Native特有のファイルの除外
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.expo/**",
      "**/android/**",
      "**/ios/**",
      "**/coverage/**",
    ],
  },

  // React Native用エイリアス
  resolve: {
    alias: {
      "@": "./src",
      "~/": "./src/",
      "@/components": "./src/components",
      "@/screens": "./src/screens",
      "@/navigation": "./src/navigation",
      "@/hooks": "./src/hooks",
      "@/services": "./src/services",
      "@/types": "./src/types",
      "@/utils": "./src/utils",
      "@/constants": "./src/constants",
    },
  },

  // React Native特有の設定
  define: {
    __DEV__: true,
    "process.env": "process.env",
  },
});

export default mergeConfig(baseConfig, reactNativeConfig);
