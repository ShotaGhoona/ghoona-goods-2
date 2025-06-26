# セットアップガイド

## 前提条件
- Docker と Docker Compose
- Node.js 18+ (ローカル開発用)
- Python 3.11+ (ローカル開発用)

## 環境セットアップ

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd ghoonagoods
```

### 2. 環境変数の設定

#### フロントエンド環境変数
`frontend/.env.local` を作成:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

#### バックエンド環境変数
`backend/.env` を更新:
```env
DATABASE_URL=postgresql://postgres:password@db:5432/ghoonagoods
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET_KEY=your-jwt-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Docker セットアップ（推奨）

#### 全サービスの起動
```bash
docker compose up --build
```

以下のサービスが起動します:
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000
- PostgreSQL: localhost:5432
- APIドキュメント: http://localhost:8000/docs

#### サービスの停止
```bash
docker compose down
```

#### 再ビルドして起動
```bash
docker compose up --build
```

### 4. ローカル開発セットアップ

#### フロントエンド
```bash
cd frontend
npm install
npm run dev
```

#### バックエンド
```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
python main.py
```

## トラブルシューティング

### よくある問題

1. **ポートがすでに使用されている**
   - ポート3000、8000、5432で実行中の他のサービスを停止
   - または docker-compose.yml でポートを変更

2. **Dockerビルドが失敗する**
   - `docker system prune` でクリーンアップ
   - Dockerに十分なリソースが割り当てられているか確認

3. **データベース接続の問題**
   - PostgreSQLサービスが実行中か確認
   - DATABASE_URL環境変数を確認

4. **フロントエンドが読み込まれない**
   - バックエンドが実行中か確認
   - NEXT_PUBLIC_API_URLが正しいか確認

### ログの確認
サービスログを表示:
```bash
# 全サービス
docker compose logs

# 特定のサービス
docker compose logs frontend
docker compose logs backend
docker compose logs db
```