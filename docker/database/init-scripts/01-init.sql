-- PostgreSQL初期化スクリプト
-- データベースとユーザーは環境変数により自動作成される

-- 拡張機能の有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- タイムゾーンの設定
SET timezone = 'Asia/Tokyo';

-- データベース設定の最適化（開発環境用）
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 0;
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- 設定の再読み込み
SELECT pg_reload_conf();