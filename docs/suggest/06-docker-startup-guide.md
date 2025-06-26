# Docker起動・運用ガイド

## 概要

このプロジェクトはDockerを使用して、フロントエンド（Next.js）とバックエンド（FastAPI）を統合環境で実行します。データベースにはSupabaseを使用しているため、ローカルのPostgreSQLコンテナは不要です。

## 前提条件

### 必要なソフトウェア
- Docker Desktop (macOS/Windows) または Docker Engine (Linux)
- Docker Compose（Docker Desktopに含まれています）

### バージョン確認
```bash
docker --version
docker-compose --version
```

推奨バージョン:
- Docker: 20.10.0 以上
- Docker Compose: 2.0.0 以上

## 初回セットアップ

### 1. 環境変数ファイルの作成

`backend/.env` ファイルを作成し、必要な環境変数を設定：

```bash
cd backend
touch .env
```

`.env` ファイルの内容例:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Security
SECRET_KEY=your-generated-secret-key-here-32-characters-minimum
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000"]

# Environment
ENVIRONMENT=development
```

詳細な環境変数設定は [05-env-setup-guide.md](./05-env-setup-guide.md) を参照してください。

### 2. プロジェクト構成確認

```
ghoonagoods/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env
│   └── app/
└── docs/
```

## 起動方法

### 基本起動
```bash
# プロジェクトルートディレクトリで実行
docker-compose up --build
```

### バックグラウンド起動
```bash
docker-compose up -d --build
```

### 初回起動時の自動処理
1. フロントエンドのnode_modulesインストール
2. バックエンドのPythonパッケージインストール
3. Supabaseへの接続確認
4. サービス起動

## サービスアクセス

起動完了後、以下のURLでアクセス可能：

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 開発時の操作

### ログの確認

```bash
# すべてのサービスのログ
docker-compose logs

# 特定のサービスのログ
docker-compose logs frontend
docker-compose logs backend

# リアルタイムでログを監視
docker-compose logs -f backend
```

### サービスの状態確認

```bash
# 実行中のコンテナ確認
docker-compose ps

# 詳細な状態確認
docker-compose top
```

### 個別サービスの再起動

```bash
# バックエンドのみ再起動
docker-compose restart backend

# フロントエンドのみ再起動
docker-compose restart frontend
```

### コンテナ内でのコマンド実行

```bash
# バックエンドコンテナでコマンド実行
docker-compose exec backend bash

# フロントエンドコンテナでコマンド実行
docker-compose exec frontend sh

# 直接コマンド実行
docker-compose exec backend python -c "print('Hello from backend')"
```

## 停止・クリーンアップ

### サービス停止

```bash
# サービス停止（コンテナは保持）
docker-compose stop

# サービス停止とコンテナ削除
docker-compose down
```

### 完全クリーンアップ

```bash
# コンテナ、ネットワーク、ボリュームをすべて削除
docker-compose down -v

# 未使用のイメージも削除
docker-compose down -v --rmi all

# Docker全体のクリーンアップ
docker system prune -a
```

## 本番環境での運用

### 本番用docker-compose設定

`docker-compose.prod.yml` の例:

```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "80:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
      - NODE_ENV=production

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
      - API_RELOAD=false
      - CORS_ORIGINS=["https://yourdomain.com"]
    env_file:
      - ./backend/.env.production
```

### 本番起動コマンド

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## トラブルシューティング

### 一般的な問題と解決方法

#### 1. ポート競合エラー
```bash
Error: bind: address already in use
```

**解決方法:**
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :8000

# プロセスを終了するか、docker-compose.ymlでポートを変更
```

#### 2. ビルドエラー
```bash
ERROR: failed to solve: dockerfile parse error
```

**解決方法:**
```bash
# Dockerfileの構文確認
# キャッシュをクリアして再ビルド
docker-compose build --no-cache
```

#### 3. 環境変数が読み込まれない
```bash
# .envファイルの存在確認
ls -la backend/.env

# 環境変数の確認
docker-compose exec backend env | grep SUPABASE
```

#### 4. Supabase接続エラー
```bash
# コンテナ内からの接続テスト
docker-compose exec backend curl -I https://your-project-id.supabase.co

# 環境変数の確認
docker-compose exec backend python -c "
import os
print('SUPABASE_URL:', os.getenv('SUPABASE_URL'))
"
```

#### 5. ファイル変更が反映されない
```bash
# ボリュームマウントの確認
docker-compose exec backend ls -la /app

# 開発用の再起動
docker-compose restart backend
```

## パフォーマンス最適化

### 開発環境での最適化

1. **ボリュームマウント最適化**
   - node_modulesを除外して高速化
   - .dockerignoreファイルの活用

2. **イメージサイズ削減**
   - Multi-stage buildの使用
   - 不要なパッケージの除去

3. **キャッシュ活用**
   - 依存関係ファイルの事前コピー
   - レイヤーキャッシュの最適化

### 本番環境での最適化

1. **セキュリティ設定**
   - 非rootユーザーでの実行
   - 最小権限の設定

2. **リソース制限**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             memory: 512M
             cpus: 0.5
   ```

3. **ヘルスチェック設定**
   ```yaml
   services:
     backend:
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
         interval: 30s
         timeout: 10s
         retries: 3
   ```

## 監視とログ

### ログ管理

```bash
# ログファイルサイズ制限
docker-compose.yml:
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### メトリクス収集

```bash
# コンテナのリソース使用量確認
docker stats

# 特定のコンテナの使用量
docker stats ghoonagoods_backend_1
```

## セキュリティ考慮事項

### 機密情報の管理

1. **.envファイルの保護**
   ```bash
   # .gitignoreに追加済みか確認
   grep "^\.env$" .gitignore
   ```

2. **本番環境でのシークレット管理**
   - Docker Secretsの使用
   - 環境変数の外部管理
   - KMSやVaultの活用

3. **ネットワークセキュリティ**
   ```yaml
   networks:
     app-network:
       driver: bridge
       internal: true
   ```

## 継続的デプロイメント

### CI/CDパイプライン例

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          docker-compose -f docker-compose.prod.yml up -d --build
```

### 環境別管理

```bash
# 開発環境
docker-compose -f docker-compose.yml up

# ステージング環境
docker-compose -f docker-compose.staging.yml up

# 本番環境
docker-compose -f docker-compose.prod.yml up
```