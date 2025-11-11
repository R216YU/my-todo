import { defineConfig, mergeConfig } from "vitest/config";
import nextConfig from "@repo/vitest-config/next";

export default mergeConfig(
  nextConfig,
  defineConfig({
    // Next.js固有の設定
    resolve: {
      alias: {
        "@": "./src",
        "~/": "./",
        "@/components": "./components",
        "@/app": "./app",
        "@/lib": "./lib",
        "@/utils": "./utils",
      },
    },

    test: {
      // Next.js固有のテスト環境設定
      environment: "jsdom",

      // テストファイルのパターン（Next.js固有）
      include: [
        "app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "components/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "lib/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "utils/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      ],
    },
  })
);
