# ニュース機能 Supabase 移行計画

## 概要
現在フロントエンドで使用しているニュース機能のダミーデータをSupabaseのリアルデータに置き換える作業計画

## 現状分析

### ダミーデータ使用箇所

#### ニュース関連（既存）
1. **`src/feature/lp/components/NewsSection.tsx`** (9-58行目)
   - `newsItems` 配列：6件のニュース情報
   - カテゴリ、タイトル、画像、要約を含む

#### ニュースギャラリー関連（新規作成済み）
2. **`src/feature/news-gallery/components/NewsGrid.tsx`** (14-124行目)
   - `allNews` 配列：12件のニュース情報
   - フィルター処理ロジック
   - 注目記事、閲覧数、読了時間を含む

3. **`src/feature/news-gallery/components/NewsFilter.tsx`** (18-35行目)
   - `categories` 配列：カテゴリ別件数情報
   - `years` 配列：年度フィルター

#### ニュース詳細関連（新規作成済み）
4. **`src/feature/news-detail/index.tsx`** (15-59行目)
   - `newsData` オブジェクト：詳細情報1件
   - HTML本文、タグ、関連記事を含む

## バックエンド構築

### A. データベースモデル作成

#### A1. Newsモデル ✅ (作成必要)
- **ファイル**: `backend/app/model/news_models.py` (新規作成)
- **作業**: 
  - `News` モデル
  - `NewsImage` モデル
  - `NewsTag` モデル
  - `NewsCategory` モデル
  - `NewsView` モデル
- **優先度**: 高

#### A2. スキーマ定義 ✅ (作成必要)
- **ファイル**: `backend/app/schemas/news_schemas.py` (新規作成)
- **作業**: 
  - `NewsCreate` スキーマ
  - `NewsUpdate` スキーマ
  - `NewsResponse` スキーマ
  - `NewsListResponse` スキーマ
  - `NewsCategoryResponse` スキーマ
- **優先度**: 高

#### A3. リポジトリ層 ✅ (作成必要)
- **ファイル**: `backend/app/repositories/news_repository.py` (新規作成)
- **作業**: 
  - ニュース一覧取得（フィルタリング・ページング）
  - ニュース詳細取得
  - カテゴリ別統計取得
  - 閲覧数更新
- **優先度**: 高

#### A4. サービス層 ✅ (作成必要)
- **ファイル**: `backend/app/services/news_service.py` (新規作成)
- **作業**: 
  - ビジネスロジック実装
  - 関連記事取得ロジック
  - 閲覧数管理
- **優先度**: 高

#### A5. API エンドポイント ✅ (作成必要)
- **ファイル**: `backend/app/api/v1/endpoints/news_endpoints.py` (新規作成)
- **作業**: 
  - `GET /api/v1/news` - ニュース一覧取得
  - `GET /api/v1/news/{id}` - ニュース詳細取得
  - `POST /api/v1/news/{id}/view` - 閲覧数更新
  - `GET /api/v1/news/categories` - カテゴリ一覧取得
  - `GET /api/v1/news/stats` - 統計情報取得
- **優先度**: 高

### B. Supabase マイグレーション

#### B1. マイグレーションファイル作成 ✅ (作成必要)
- **ファイル**: `supabase/migrations/003_create_news_tables.sql` (新規作成)
- **作業**: 
  - news_categories テーブル作成
  - news テーブル作成
  - news_images テーブル作成
  - news_tags テーブル作成
  - news_views テーブル作成
  - インデックス作成
  - 初期データ投入
- **優先度**: 高

#### B2. シードデータ作成 ✅ (作成必要)
- **ファイル**: `supabase/seed/003_news_seed_data.sql` (新規作成)
- **作業**: 
  - カテゴリ初期データ
  - サンプルニュース記事（現在のダミーデータベース）
  - 画像・タグデータ
- **優先度**: 高

## フロントエンド移行

### C. 環境設定・基盤構築

#### C1. 型定義統一 ✅ (作成必要)
- **ファイル**: `frontend/src/types/news.ts` (新規作成)
- **作業**: 
  - `NewsItem` インターフェース
  - `NewsImage` インターフェース
  - `NewsTag` インターフェース
  - `NewsCategory` インターフェース
  - `NewsFilter` インターフェース
  - `NewsStats` インターフェース
- **優先度**: 高

#### C2. 定数定義ファイル ✅ (作成必要)
- **ファイル**: `frontend/src/constants/news.ts` (新規作成)
- **作業**: カテゴリ、デフォルト値などの定数定義
- **優先度**: 中

### D. データ取得ロジック構築

#### D1. サービス層構築 ✅ (作成必要)
- **ファイル**: `frontend/src/services/news.service.ts` (新規作成)
- **作業**: 
  - `getNews()` - ニュース一覧取得（フィルター・ページング対応）
  - `getNewsById()` - ニュース詳細取得
  - `getNewsCategories()` - カテゴリ一覧取得
  - `getNewsStats()` - 統計データ取得
  - `incrementNewsView()` - 閲覧数更新
  - `getRelatedNews()` - 関連記事取得
- **優先度**: 高

#### D2. カスタムフック ✅ (作成必要)
- **ファイル**: `frontend/src/hooks/useNews.ts` (新規作成)
- **作業**: 
  - `useNews()` - ニュース一覧取得フック
  - `useNewsDetail()` - ニュース詳細取得フック
  - `useNewsCategories()` - カテゴリ取得フック
  - `useNewsStats()` - 統計取得フック
- **優先度**: 高

### E. コンポーネント修正

#### E1. ニュースギャラリー系コンポーネント (優先度：高)

**`src/feature/news-gallery/components/NewsGrid.tsx`**
- ダミーデータ削除
- `useNews` フック使用
- フィルター機能との連携
- ローディング・エラー状態の追加
- 無限スクロール実装検討

**`src/feature/news-gallery/components/NewsFilter.tsx`**
- 静的カテゴリ情報を動的取得に変更
- カテゴリ別件数の動的更新
- フィルター状態管理の改善

**`src/feature/news-gallery/index.tsx`**
- フィルター状態の最適化
- URL同期機能（クエリパラメータ）

#### E2. ニュース詳細系コンポーネント (優先度：高)

**`src/feature/news-detail/index.tsx`**
- パラメータからIDを取得
- 動的データ取得実装
- 404ページ対応
- 閲覧数更新API呼び出し
- 関連記事の動的取得

#### E3. LP系コンポーネント (優先度：中)

**`src/feature/lp/components/NewsSection.tsx`**
- ニュースデータの動的取得
- 最新記事の表示
- パフォーマンス最適化

### F. 追加機能・改善

#### F1. ローディング・エラー処理 ✅ (作成必要)
- **作業**: 全コンポーネントにローディング状態とエラー処理を追加
- **優先度**: 中

#### F2. キャッシュ機能 ✅ (検討)
- **作業**: React QueryまたはSWRの導入検討
- **優先度**: 低

#### F3. SEO対応 ✅ (将来的)
- **作業**: Next.js メタデータAPI の活用
- **優先度**: 低

#### F4. 画像最適化 ✅ (将来的)
- **作業**: Next.js Image コンポーネントの適用
- **優先度**: 低

## 作業優先順位

### フェーズ1：バックエンド基盤構築（必須）
1. データベーススキーマ設計確認
2. Supabaseマイグレーション実行
3. モデル・スキーマ定義
4. リポジトリ層実装
5. サービス層実装
6. API エンドポイント実装

### フェーズ2：フロントエンド基盤構築（必須）
1. 型定義作成
2. サービス層作成
3. カスタムフック作成
4. 定数定義

### フェーズ3：ニュース機能実装（高優先度）
1. NewsGrid修正
2. NewsFilter修正
3. NewsDetail修正
4. ニュース一覧ページ動作確認

### フェーズ4：LP機能統合（中優先度）
1. LP NewsSection修正
2. 全体動作確認

### フェーズ5：最適化・改善（低優先度）
1. ローディング・エラー処理
2. パフォーマンス最適化
3. SEO対応
4. キャッシュ機能

## API 設計

### エンドポイント一覧
```
GET    /api/v1/news                 # ニュース一覧取得
GET    /api/v1/news/{id}           # ニュース詳細取得
POST   /api/v1/news/{id}/view      # 閲覧数更新
GET    /api/v1/news/categories     # カテゴリ一覧取得
GET    /api/v1/news/stats          # 統計情報取得
```

### クエリパラメータ例
```
GET /api/v1/news?category=新商品&year=2024&search=アクリル&page=1&limit=12&featured=true
```

### レスポンス例
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "新型アクリルスタンドシリーズ発売開始",
      "category": "新商品",
      "excerpt": "より耐久性の高い新素材を使用した...",
      "featured_image_url": "https://...",
      "author": "Ghoona Goods 開発チーム",
      "read_time_minutes": 3,
      "view_count": 1250,
      "is_featured": true,
      "published_at": "2024-06-23T00:00:00Z",
      "tags": ["新商品", "アクリルスタンド"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 120,
    "total_pages": 10
  }
}
```

## 注意点

### データ構造の差異
- フロントエンドの配列構造 ↔ DB の正規化テーブル
- 画像URL管理の統一
- カテゴリのENUM vs テーブル管理

### パフォーマンス考慮
- 記事一覧の効率的な取得
- 関連記事の最適化
- 閲覧数更新の非同期処理

### エラーハンドリング
- 記事が見つからない場合
- カテゴリフィルターエラー
- 閲覧数更新失敗

### セキュリティ
- XSS対策（HTMLコンテンツのサニタイズ）
- 閲覧数の不正操作防止
- 未公開記事のアクセス制御

## 完了目標
- ニュース機能のダミーデータ完全除去
- Supabaseからのリアルデータ表示
- フィルター・検索機能の正常動作
- 閲覧数管理機能の実装
- パフォーマンスの最適化
- エラーハンドリングの実装