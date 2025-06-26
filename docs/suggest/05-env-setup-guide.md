# 環境変数セットアップガイド

## 必要な環境変数

FastAPIアプリケーションを動作させるために、以下の環境変数を設定する必要があります。

### 1. Supabase設定（必須）

```env
# Supabase プロジェクトのURL
SUPABASE_URL=https://your-project-id.supabase.co

# Supabase の匿名キー（公開用）
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase のサービスロールキー（管理用・秘匿情報）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**取得方法:**
1. [Supabase Dashboard](https://app.supabase.com) にログイン
2. プロジェクトを選択
3. Settings → API で確認
   - `URL`: Project URL
   - `SUPABASE_ANON_KEY`: anon public
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role（⚠️機密情報）

### 2. API設定（オプション）

```env
# APIサーバーのホスト（デフォルト: 0.0.0.0）
API_HOST=0.0.0.0

# APIサーバーのポート（デフォルト: 8000）
API_PORT=8000

# 開発時の自動リロード（デフォルト: true）
API_RELOAD=true
```

### 3. セキュリティ設定（必須）

```env
# JWT トークン署名用の秘密鍵（32文字以上の文字列）
SECRET_KEY=your-very-secure-secret-key-at-least-32-characters-long

# JWT アルゴリズム（デフォルト: HS256）
ALGORITHM=HS256

# アクセストークンの有効期限（分）（デフォルト: 30）
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**SECRET_KEY生成方法:**
```bash
# Python で生成
python -c "import secrets; print(secrets.token_urlsafe(32))"

# または OpenSSL で生成
openssl rand -base64 32
```

### 4. CORS設定（オプション）

```env
# 許可するオリジン（JSON配列形式）
CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]
```

### 5. 環境設定（オプション）

```env
# 実行環境（development, staging, production）
ENVIRONMENT=development
```

## .env ファイルの作成

### 1. ファイル作成

`backend/.env` ファイルを作成：

```bash
# プロジェクトルートから
cd backend
touch .env

# または .env.example が存在する場合
cp .env.example .env
```

### 2. 実際の値を設定

`.env` ファイルを編集して実際の値を設定：

```env
# Supabase Configuration
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDE1NzU2MDAwfQ.example-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjIwMTU3NTYwMDB9.example-service-role-key

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

## セキュリティ注意事項

### ⚠️ 重要: 秘密情報の管理

1. **`.env` ファイルをGitにコミットしない**
   ```bash
   # .gitignore に追加済みか確認
   echo ".env" >> .gitignore
   ```

2. **SUPABASE_SERVICE_ROLE_KEY は特に注意**
   - このキーがあればデータベースに完全アクセス可能
   - 本番環境では環境変数やシークレット管理サービスを使用

3. **SECRET_KEY の生成**
   - 十分に複雑で予測困難な文字列を使用
   - 本番環境では定期的に更新を検討

## 環境別設定例

### 開発環境 (.env.development)
```env
ENVIRONMENT=development
API_RELOAD=true
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

### ステージング環境 (.env.staging)
```env
ENVIRONMENT=staging
API_RELOAD=false
CORS_ORIGINS=["https://staging.yourdomain.com"]
```

### 本番環境 (.env.production)
```env
ENVIRONMENT=production
API_RELOAD=false
CORS_ORIGINS=["https://yourdomain.com"]
```

## 設定確認方法

### 1. Docker起動時のログ確認
```bash
# すべてのサービスを起動
docker-compose up --build

# バックエンドのログのみ監視
docker-compose logs -f backend
```

起動ログで以下を確認：
- Supabase URL の表示
- 環境設定の表示
- エラーがないこと

### 2. ヘルスチェックでの確認
```bash
curl http://localhost:8000/api/v1/health/detailed
```

レスポンス例：
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "development",
  "components": {
    "database": {
      "status": "healthy",
      "message": "Database connection successful"
    },
    "configuration": {
      "status": "healthy", 
      "message": "Configuration loaded"
    }
  }
}
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. Supabase接続エラー
```
Error: Failed to initialize Supabase client
```

**解決方法:**
- SUPABASE_URL の形式確認（https://で始まる）
- SUPABASE_ANON_KEY の有効性確認
- ネットワーク接続確認

#### 2. 設定読み込みエラー
```
Error: Missing required configuration
```

**解決方法:**
- `.env` ファイルの存在確認
- 必須環境変数の設定確認
- ファイルの文字エンコーディング確認（UTF-8）

#### 3. SECRET_KEY エラー
```
Error: SECRET_KEY must be at least 32 characters
```

**解決方法:**
- SECRET_KEY の長さ確認（32文字以上）
- 特殊文字や空白の確認

#### 4. CORS エラー
```
Access to fetch at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**解決方法:**
- CORS_ORIGINS にフロントエンドのURLを追加
- JSON配列形式で正しく記述しているか確認

## 本番環境への展開

### 1. 環境変数の設定方法

#### Docker Compose（現在の設定）
```yaml
services:
  backend:
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - SECRET_KEY=${SECRET_KEY}
      - CORS_ORIGINS=["http://localhost:3000"]
    env_file:
      - ./backend/.env
```

#### 本番環境でのDocker Compose
```yaml
services:
  backend:
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - SECRET_KEY=${SECRET_KEY}
      - ENVIRONMENT=production
      - CORS_ORIGINS=["https://yourdomain.com"]
    env_file:
      - ./backend/.env.production
```

#### Cloud providers
- **Vercel**: Environment Variables セクション
- **Heroku**: Config Vars セクション
- **AWS**: Systems Manager Parameter Store
- **Google Cloud**: Secret Manager

### 2. セキュリティチェックリスト

- [ ] `.env` ファイルが `.gitignore` に含まれている
- [ ] 本番環境の SECRET_KEY が開発環境と異なる
- [ ] SUPABASE_SERVICE_ROLE_KEY が適切に保護されている
- [ ] CORS_ORIGINS が本番ドメインのみに限定されている
- [ ] 不要な環境変数が設定されていない
- [ ] ログに機密情報が出力されていない