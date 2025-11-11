import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "./vitest.config.base.js";

/**
 * Next.js/Web アプリケーション用のVitest設定
 * React、Next.js等のフロントエンドアプリケーション向け
 */
export const nextConfig = defineConfig({
  test: {
    environment: "jsdom",

    // React Testing Library等のセットアップ
    setupFiles: [],

    // ブラウザ環境の設定
    globals: true,

    // CSS modules、画像等のモック
    css: true,

    // 環境変数設定
    env: {
      NODE_ENV: "test",
    },
  },

  // Next.js用エイリアス
  resolve: {
    alias: {
      "@": "./src",
      "~/": "./src/",
      "@/components": "./src/components",
      "@/pages": "./src/pages",
      "@/lib": "./src/lib",
      "@/utils": "./src/utils",
      "@/hooks": "./src/hooks",
      "@/types": "./src/types",
      "@/styles": "./src/styles",
    },
  },

  // Next.jsの静的アセットの処理
  define: {
    "process.env": "process.env",
  },
});

export default mergeConfig(baseConfig, nextConfig);
