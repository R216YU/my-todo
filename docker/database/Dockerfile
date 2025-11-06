# PostgreSQL開発用データベース
FROM postgres:15-alpine

# 環境変数
ENV POSTGRES_DB=todo_db
ENV POSTGRES_USER=todo_user
ENV POSTGRES_PASSWORD=todo_password
ENV PGDATA=/var/lib/postgresql/data/pgdata

# 日本語ロケール設定
ENV LANG ja_JP.utf8

# 初期化SQLスクリプトはdocker-compose.ymlのボリュームマウントで処理

# ポート開放
EXPOSE 5432

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# データボリュームの設定
VOLUME ["/var/lib/postgresql/data"]