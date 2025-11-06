# @repo/database

このパッケージはTurborepo内の共有データベース層を提供し、Prisma ORMを使用してデータベース操作を管理します。

## 特徴

- PostgreSQLデータベースサポート
- TypeScriptでの型安全性
- Prismaクライアントの自動生成
- マイグレーション管理
- シードデータサポート

## インストール

他のパッケージでこのデータベースパッケージを使用するには：

```bash
pnpm add @repo/database
```

## 使用方法

### 基本的なインポート

```typescript
import { prisma, PrismaClient, User, Todo } from "@repo/database";

// データベースクライアントを直接使用
const users = await prisma.user.findMany();

// または新しいインスタンスを作成
const client = new PrismaClient();
```

### データベース操作の例

```typescript
import { prisma } from "@repo/database";

// ユーザーを作成
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});

// Todoを作成
const todo = await prisma.todo.create({
  data: {
    title: "Learn Prisma",
    description: "Study Prisma ORM documentation",
    userId: user.id,
    priority: "HIGH",
  },
});

// Todoを取得（ユーザー情報も含む）
const todosWithUser = await prisma.todo.findMany({
  include: {
    user: true,
  },
});
```

## 利用可能なスクリプト

```bash
# Prismaクライアントを生成
pnpm db:generate

# データベースをスキーマと同期（開発時）
pnpm db:push

# マイグレーションを作成・適用
pnpm db:migrate

# Prisma Studioを開く
pnpm db:studio

# データベースにシードデータを投入
pnpm db:seed

# TypeScriptをビルド
pnpm build

# 開発モードでTypeScriptを監視
pnpm dev
```

## データベースモデル

### User

- `id`: ユニークID (CUID)
- `email`: メールアドレス (ユニーク)
- `name`: ユーザー名 (オプション)
- `todos`: 関連するTodoのリスト

### Todo

- `id`: ユニークID (CUID)
- `title`: タイトル
- `description`: 説明 (オプション)
- `completed`: 完了状態 (デフォルト: false)
- `priority`: 優先度 (LOW, MEDIUM, HIGH, URGENT)
- `dueDate`: 期限日 (オプション)
- `userId`: 所有者のユーザーID

## 環境変数

`.env`ファイルに以下の環境変数を設定してください：

```env
DATABASE_URL="your-postgresql-connection-string"
```

## セットアップ

1. データベースを準備
2. 環境変数を設定
3. マイグレーションを実行: `pnpm db:migrate`
4. シードデータを投入（オプション）: `pnpm db:seed`

## 開発ワークフロー

1. `prisma/schema.prisma`でスキーマを編集
2. `pnpm db:generate`でクライアントを再生成
3. `pnpm db:migrate`でマイグレーションを作成・適用
4. 他のアプリケーションで新しい型とメソッドを使用
