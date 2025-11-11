import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "./vitest.config.base.js";

/**
 * Node.js/API アプリケーション用のVitest設定
 * Express、Hono、Fastify等のサーバーサイドアプリケーション向け
 */
export const nodeConfig = defineConfig({
  test: {
    environment: "node",

    // Node.js固有の設定
    setupFiles: [],

    // 環境変数設定
    env: {
      NODE_ENV: "test",
    },

    // テストファイルの並列実行を有効化
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: false,
        isolate: true,
      },
    },
  },

  // Node.js用エイリアス
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});

export default mergeConfig(baseConfig, nodeConfig);
