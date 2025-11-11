# @repo/vitest-config

全てのアプリケーションで共通利用するVitestの設定パッケージです。

## 概要

このパッケージは、モノレポ内の各アプリケーション（API、Web、Mobile、Desktop）で統一されたテスト環境を提供します。

## 提供する設定

### 基本設定

- `@repo/vitest-config/base` - 全アプリケーション共通の基本設定

### アプリケーション別設定

- `@repo/vitest-config/node` - Node.js/API アプリケーション用
- `@repo/vitest-config/next` - Next.js/Web アプリケーション用
- `@repo/vitest-config/react-native` - React Native/Mobile アプリケーション用
- `@repo/vitest-config/electron` - Electron/Desktop アプリケーション用

### テストユーティリティ

- `@repo/vitest-config/test-utils` - 共通テストヘルパー関数

## 使用方法

### インストール

各アプリケーションのpackage.jsonに依存関係を追加：

```json
{
  "devDependencies": {
    "@repo/vitest-config": "workspace:*",
    "vitest": "^2.1.4"
  }
}
```

### 設定ファイルの作成

アプリケーションのルートに`vitest.config.ts`を作成：

#### Node.js/API の場合

```typescript
import { defineConfig, mergeConfig } from "vitest/config";
import nodeConfig from "@repo/vitest-config/node";

export default mergeConfig(
  nodeConfig,
  defineConfig({
    // アプリケーション固有の設定をここに追加
  })
);
```

#### Next.js/Web の場合

```typescript
import { defineConfig, mergeConfig } from "vitest/config";
import nextConfig from "@repo/vitest-config/next";

export default mergeConfig(
  nextConfig,
  defineConfig({
    // アプリケーション固有の設定をここに追加
  })
);
```

### テストユーティリティの使用

```typescript
import {
  asyncTestUtils,
  mockDataUtils,
  apiTestUtils,
} from "@repo/vitest-config/test-utils";

describe("API Test", () => {
  it("should handle async operations", async () => {
    // 非同期処理のテスト
    await asyncTestUtils.waitFor(() => someCondition());

    // モックデータの生成
    const mockData = {
      name: mockDataUtils.randomString(10),
      age: mockDataUtils.randomNumber(18, 65),
      isActive: mockDataUtils.randomBoolean(),
    };

    // APIレスポンスのテスト
    apiTestUtils.expectApiResponse(response).toHaveStatus(200);
  });
});
```

## 設定の詳細

### 共通設定（base）

- テスト環境: Node.js
- グローバル関数の有効化
- カバレッジレポート設定
- ファイル監視設定

### Node.js設定

- Node.js環境でのテスト実行
- サーバーサイド用のエイリアス設定
- 環境変数の設定

### Next.js設定

- jsdom環境でのテスト実行
- CSS、静的ファイルのモック
- Next.js用のパスエイリアス

### React Native設定

- jsdom環境でのテスト実行
- React Native特有のファイル除外
- モバイルアプリ用のパスエイリアス

### Electron設定

- jsdom環境でのテスト実行
- Electron特有のファイル除外
- デスクトップアプリ用のパスエイリアス

## 開発

### ビルド

```bash
pnpm build
```

### テスト

```bash
pnpm test
```

## 依存関係

### Peer Dependencies

- vitest ^2.0.0
- typescript ^5.0.0

### Dev Dependencies

- @types/node
- jsdom
- happy-dom
