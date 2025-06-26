# FastAPI バックエンドファイル作成計画

## 現状分析

### ディレクトリ構造確認結果
```
backend/
├── main.py ✅ (基本設定済み)
├── requirements.txt ✅ (依存関係設定済み)
├── Dockerfile ✅
└── app/
    ├── __init__.py ✅
    ├── api/
    │   ├── __init__.py ✅
    │   └── v1/
    │       └── __init__.py ✅ (テストエンドポイントのみ)
    ├── cli/
    │   └── __init__.py ✅ (空)
    ├── model/
    │   └── __init__.py ❌ (空)
    ├── repositories/
    │   └── __init__.py ❌ (空)
    ├── schemas/
    │   └── __init__.py ❌ (空)
    ├── services/
    │   └── __init__.py ❌ (空)
    └── utils/
        └── __init__.py ❌ (空)
```

### 問題点
1. **models**: データベースモデル未定義
2. **schemas**: Pydanticスキーマ未定義
3. **repositories**: データアクセス層未実装
4. **services**: ビジネスロジック層未実装
5. **api/v1**: エンドポイント未実装
6. **設定ファイル**: Supabase接続設定なし

## 必要なファイル作成リスト

### A. 設定・基盤ファイル

#### A1. 環境設定
- **ファイル**: `backend/.env` (新規作成)
- **内容**: Supabase接続情報、API設定
- **優先度**: 高

#### A2. データベース設定
- **ファイル**: `backend/app/database.py` (新規作成)
- **内容**: Supabase クライアント設定、接続管理
- **優先度**: 高

#### A3. アプリケーション設定
- **ファイル**: `backend/app/config.py` (新規作成)
- **内容**: 環境変数読み込み、設定管理
- **優先度**: 高

### B. データモデル層

#### B1. ベースモデル
- **ファイル**: `backend/app/model/base.py` (新規作成)
- **内容**: 共通ベースクラス、ユーティリティ
- **優先度**: 高

#### B2. 製品実績モデル
- **ファイル**: `backend/app/model/portfolio.py` (新規作成)
- **内容**: 
  - `Portfolio` モデル
  - `PortfolioImage` モデル
  - `PortfolioTag` モデル
  - `PortfolioSpecification` モデル
- **優先度**: 高

#### B3. モデル集約
- **ファイル**: `backend/app/model/__init__.py` (修正)
- **内容**: 全モデルのエクスポート
- **優先度**: 高

### C. Pydanticスキーマ層

#### C1. ベーススキーマ
- **ファイル**: `backend/app/schemas/base.py` (新規作成)
- **内容**: 共通レスポンススキーマ、ページネーション
- **優先度**: 高

#### C2. 製品実績スキーマ
- **ファイル**: `backend/app/schemas/portfolio.py` (新規作成)
- **内容**:
  - `PortfolioCreate` - 作成用スキーマ
  - `PortfolioUpdate` - 更新用スキーマ
  - `PortfolioResponse` - レスポンス用スキーマ
  - `PortfolioDetail` - 詳細表示用スキーマ
  - `PortfolioFilter` - フィルター用スキーマ
  - `PortfolioStats` - 統計用スキーマ
- **優先度**: 高

#### C3. 画像・タグ・仕様スキーマ
- **ファイル**: `backend/app/schemas/portfolio_relations.py` (新規作成)
- **内容**:
  - `PortfolioImageResponse`
  - `PortfolioTagResponse`
  - `PortfolioSpecificationResponse`
- **優先度**: 高

#### C4. スキーマ集約
- **ファイル**: `backend/app/schemas/__init__.py` (修正)
- **内容**: 全スキーマのエクスポート
- **優先度**: 高

### D. リポジトリ層（データアクセス）

#### D1. ベースリポジトリ
- **ファイル**: `backend/app/repositories/base.py` (新規作成)
- **内容**: 共通CRUD操作、ベースクラス
- **優先度**: 高

#### D2. 製品実績リポジトリ
- **ファイル**: `backend/app/repositories/portfolio.py` (新規作成)
- **内容**:
  - `get_portfolios()` - 一覧取得（フィルター対応）
  - `get_portfolio_by_id()` - 詳細取得
  - `get_portfolio_stats()` - 統計取得
  - `create_portfolio()` - 新規作成
  - `update_portfolio()` - 更新
  - `delete_portfolio()` - 削除
- **優先度**: 高

#### D3. リポジトリ集約
- **ファイル**: `backend/app/repositories/__init__.py` (修正)
- **内容**: 全リポジトリのエクスポート
- **優先度**: 高

### E. サービス層（ビジネスロジック）

#### E1. ベースサービス
- **ファイル**: `backend/app/services/base.py` (新規作成)
- **内容**: 共通ビジネスロジック、エラーハンドリング
- **優先度**: 中

#### E2. 製品実績サービス
- **ファイル**: `backend/app/services/portfolio.py` (新規作成)
- **内容**:
  - データ変換ロジック
  - バリデーション
  - 複雑なビジネスルール
- **優先度**: 中

#### E3. サービス集約
- **ファイル**: `backend/app/services/__init__.py` (修正)
- **内容**: 全サービスのエクスポート
- **優先度**: 中

### F. API エンドポイント層

#### F1. 製品実績エンドポイント
- **ファイル**: `backend/app/api/v1/endpoints/portfolio.py` (新規作成)
- **内容**:
  - `GET /portfolios` - 一覧取得（フィルター・ページング対応）
  - `GET /portfolios/{id}` - 詳細取得
  - `GET /portfolios/stats` - 統計情報取得
  - `POST /portfolios` - 新規作成（管理用）
  - `PUT /portfolios/{id}` - 更新（管理用）
  - `DELETE /portfolios/{id}` - 削除（管理用）
- **優先度**: 高

#### F2. ヘルスチェック・その他
- **ファイル**: `backend/app/api/v1/endpoints/health.py` (新規作成)
- **内容**: ヘルスチェック、システム情報
- **優先度**: 低

#### F3. APIルーター統合
- **ファイル**: `backend/app/api/v1/__init__.py` (修正)
- **内容**: 各エンドポイントルーターの統合
- **優先度**: 高

### G. ユーティリティ・依存関係

#### G1. 依存関係管理
- **ファイル**: `backend/app/dependencies.py` (新規作成)
- **内容**: FastAPI依存関係、認証等
- **優先度**: 中

#### G2. ユーティリティ関数
- **ファイル**: `backend/app/utils/common.py` (新規作成)
- **内容**: 共通ユーティリティ関数
- **優先度**: 低

#### G3. ユーティリティ集約
- **ファイル**: `backend/app/utils/__init__.py` (修正)
- **内容**: ユーティリティのエクスポート
- **優先度**: 低

### H. テスト・その他

#### H1. テストファイル
- **ファイル**: `backend/tests/` (新規ディレクトリ)
- **内容**: APIテスト、ユニットテスト
- **優先度**: 低

#### H2. 開発用スクリプト
- **ファイル**: `backend/scripts/` (新規ディレクトリ)
- **内容**: データベース初期化、シードデータ投入
- **優先度**: 低

## 作業優先順位

### フェーズ1: 基盤構築（必須）
1. 環境設定 (`.env`, `config.py`, `database.py`)
2. ベースクラス (`model/base.py`, `schemas/base.py`, `repositories/base.py`)
3. モデル定義 (`model/portfolio.py`)
4. スキーマ定義 (`schemas/portfolio.py`)

### フェーズ2: データアクセス実装
1. リポジトリ実装 (`repositories/portfolio.py`)
2. サービス実装 (`services/portfolio.py`)
3. 依存関係設定 (`dependencies.py`)

### フェーズ3: API エンドポイント実装
1. 製品実績エンドポイント (`api/v1/endpoints/portfolio.py`)
2. ルーター統合 (`api/v1/__init__.py`)
3. エラーハンドリング強化

### フェーズ4: 最適化・テスト
1. パフォーマンス最適化
2. テスト実装
3. ドキュメント整備

## 技術スタック詳細

### データベース接続
- **Supabase Python Client**: リアルタイム対応
- **PostgreSQL**: 直接接続も可能
- **SQLAlchemy**: ORM（必要に応じて）

### FastAPI 機能
- **Pydantic V2**: データバリデーション
- **依存注入**: 設定、認証、DB接続
- **自動API文書**: Swagger/OpenAPI
- **型ヒント**: 完全対応

### エラーハンドリング
- **HTTPException**: 標準エラーレスポンス
- **カスタム例外**: ビジネスロジック用
- **ログ記録**: 構造化ログ

## 推定作業時間

### フェーズ1 (基盤): 4-6時間
### フェーズ2 (データアクセス): 6-8時間  
### フェーズ3 (API): 4-6時間
### フェーズ4 (最適化): 2-4時間

**合計: 16-24時間**

## 注意点

1. **Supabase RLS**: Row Level Security との連携
2. **CORS設定**: フロントエンドとの通信
3. **エラーハンドリング**: 一貫したエラーレスポンス
4. **パフォーマンス**: N+1問題の回避
5. **セキュリティ**: 入力値検証、SQLインジェクション対策