# デプロイメントガイド

## 概要
このガイドでは、Ghoona Goodsアプリケーションのデプロイメント戦略について説明します。

## アーキテクチャ
- **フロントエンド**: Vercelにデプロイ
- **バックエンド**: Railwayにデプロイ
- **データベース**: SupabaseのPostgreSQL

## フロントエンドデプロイメント（Vercel）

### 前提条件
- Vercelアカウント
- GitHubリポジトリの接続

### 手順
1. **リポジトリの接続**
   - VercelダッシュボードでGitHubからプロジェクトをインポート
   - `frontend` ディレクトリをルートとして選択

2. **環境変数の設定**
   Vercelダッシュボードで以下を設定:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   CLERK_WEBHOOK_SECRET=
   ```

3. **ビルド設定**
   - フレームワークプリセット: Next.js
   - ビルドコマンド: `npm run build`
   - 出力ディレクトリ: `.next`
   - ルートディレクトリ: `frontend`

4. **デプロイ**
   - mainブランチへのプッシュで自動デプロイ

## バックエンドデプロイメント（Railway）

### 前提条件
- Railwayアカウント
- GitHubリポジトリの接続

### 手順
1. **新しいプロジェクトの作成**
   - GitHubリポジトリを接続
   - `backend` ディレクトリを選択

2. **環境変数の設定**
   Railwayダッシュボードで以下を設定:
   ```
   DATABASE_URL=postgresql://user:pass@host:port/db
   SUPABASE_URL=
   SUPABASE_KEY=
   CLERK_SECRET_KEY=
   JWT_SECRET_KEY=
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

3. **ビルド設定**
   RailwayはPythonアプリケーションを自動検出
   - ビルドコマンド: `pip install -r requirements.txt`
   - 開始コマンド: `python main.py`

4. **ポート設定**
   - RailwayはPORT環境変数を自動割り当て
   - 必要に応じてmain.pyを更新

## データベースセットアップ（Supabase）

### 手順
1. **プロジェクトの作成**
   - Supabaseにサインアップ
   - 新しいプロジェクトを作成

2. **接続詳細の取得**
   - Settings > Databaseに移動
   - 接続文字列と認証情報をコピー

3. **環境変数の更新**
   - バックエンドデプロイメントのDATABASE_URLを更新
   - フロントエンドデプロイメントのSupabaseキーを更新

## ドメイン設定

### カスタムドメイン（オプション）
1. **Vercelドメイン**
   - Vercelダッシュボードでカスタムドメインを追加
   - 指示に従ってDNSレコードを更新

2. **APIドメイン**
   - Railwayは自動的にサブドメインを提供
   - カスタムドメインは有料プランで利用可能

## 監視とログ

### Vercel
- Vercelダッシュボードでデプロイメントログを表示
- リアルタイム関数ログが利用可能

### Railway
- Railwayダッシュボードでアプリケーションログを表示
- メトリクスと監視が利用可能

### Supabase
- Supabaseダッシュボードでデータベースログとメトリクス
- クエリパフォーマンス監視

## CI/CDパイプライン

### 自動デプロイメント
両プラットフォームはmainブランチへのプッシュで自動デプロイをサポート:

1. **フロントエンド**: Vercelがmainプッシュで自動デプロイ
2. **バックエンド**: Railwayがmainプッシュで自動デプロイ

### 手動デプロイメント
- Vercel: ダッシュボードからデプロイメントをトリガー
- Railway: ダッシュボードからデプロイメントをトリガー

## セキュリティ考慮事項

1. **環境変数**
   - リポジトリにシークレットをコミットしない
   - プラットフォーム固有の環境変数管理を使用

2. **CORS設定**
   - 本番URLの許可オリジンを更新
   - backend main.pyで設定

3. **データベースセキュリティ**
   - コネクションプーリングを使用
   - SSL接続を有効化
   - 定期的なセキュリティ更新

## ロールバック戦略

1. **フロントエンド**
   - Vercelはデプロイメント履歴を保持
   - ワンクリックロールバック可能

2. **バックエンド**
   - Railway前回のデプロイメントへのロールバックをサポート
   - データベースマイグレーションは手動介入が必要な場合がある

3. **データベース**
   - Supabase経由の定期バックアップ
   - ポイントインタイムリカバリ利用可能