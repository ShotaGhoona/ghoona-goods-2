# フロントエンド Supabase 移行計画

## 概要
現在フロントエンドで使用しているダミーデータをSupabaseのリアルデータに置き換える作業計画

## 現状分析

### ダミーデータ使用箇所

#### ギャラリー関連
1. **`src/feature/gallery/components/GalleryGrid.tsx`** (32-132行目)
   - `portfolioItems` 配列：9件の製品情報
   - フィルター処理ロジック
   - 画像URL、タグ、仕様情報を含む

2. **`src/feature/gallery/components/GalleryFilter.tsx`** (18-40行目)
   - `categories` 配列：カテゴリ別件数情報
   - `years` 配列：年度フィルター
   - `industries` 配列：業界フィルター

3. **`src/feature/gallery/components/GalleryStats.tsx`** (28-53行目)
   - `stats` 配列：カテゴリ別統計データ
   - 総製造数量などの集計データ

#### ギャラリー詳細関連
4. **`src/feature/gallery-detail/index.tsx`** (43-69行目)
   - `portfolioItems` 配列：詳細情報1件
   - 画像、タグ、仕様情報の詳細データ

#### LP関連
5. **`src/feature/lp/components/ProductGallerySection.tsx`** (37-86行目)
   - `galleryItems` 配列：LP用製品6件

6. **`src/feature/lp/components/NewsSection.tsx`** (9-58行目)
   - `newsItems` 配列：ニュース記事6件

7. **`src/feature/lp/components/TestimonialsSection.tsx`** (28-50行目)
   - `testimonials` 配列：顧客レビュー3件

8. **`src/feature/lp/components/ProductComparisonSection.tsx`** (28-64行目)
   - `comparisonData` 配列：製品比較データ

## 移行作業リスト

### A. 環境設定・基盤構築

#### A1. 環境変数設定 ✅ (部分的完了)
- **ファイル**: `frontend/.env` (作成済み)
- **現状**: `NEXT_PUBLIC_API_URL=http://localhost:8000` 設定済み
- **追加作業**: 本番環境用の設定追加
- **優先度**: 中

#### A2. FastAPI統合設定 🆕
- **ファイル**: `src/lib/api-client.ts` (新規作成)
- **作業**: FastAPIバックエンドとの統合クライアント作成
- **優先度**: 高

#### A3. Supabase依存関係削除 🆕
- **作業**: Supabaseクライアントライブラリは不要（FastAPI経由でアクセス）
- **優先度**: 低

### B. 型定義統一

#### B1. 共通型定義ファイル
- **ファイル**: `src/types/index.ts` (新規作成)
- **作業**: 
  - `PortfolioItem` インターフェース統一
  - `PortfolioImage` インターフェース
  - `PortfolioTag` インターフェース
  - `PortfolioSpecification` インターフェース
  - フィルター関連の型定義
- **優先度**: 高

#### B2. 定数定義ファイル
- **ファイル**: `src/constants/categories.ts` (新規作成)
- **作業**: カテゴリ、業界などの定数定義
- **優先度**: 中

### C. データ取得ロジック構築

#### C1. サービス層構築 🆕
- **ファイル**: `src/services/portfolio.service.ts` (新規作成)
- **作業**: 
  - `getPortfolios()` - 製品一覧取得（フィルター・ページング対応）
  - `getPortfolioById()` - 製品詳細取得
  - `getPortfolioStats()` - 統計データ取得
- **優先度**: 高

- **ファイル**: `src/services/base.service.ts` (新規作成)
- **作業**: 共通のHTTPクライアント・エラーハンドリング
- **優先度**: 高

#### C2. カスタムフック（簡素化）🆕
- **ファイル**: `src/hooks/usePortfolio.ts` (新規作成)
- **作業**: サービス層を利用した軽量なReactフック
- **優先度**: 高

**注意**: ニュース・レビュー機能は現在のバックエンドに未実装のため後回し

### D. コンポーネント修正

#### D1. ギャラリー系コンポーネント (優先度：高)

**`src/feature/gallery/components/GalleryGrid.tsx`**
- ダミーデータ削除
- `usePortfolio` フック使用
- フィルター機能との連携
- ローディング・エラー状態の追加

**`src/feature/gallery/components/GalleryFilter.tsx`**
- 静的カテゴリ情報を動的取得に変更
- カテゴリ別件数の動的更新
- フィルター状態管理の改善

**`src/feature/gallery/components/GalleryStats.tsx`**
- 統計API呼び出し実装
- リアルタイム統計データ表示

**`src/feature/gallery-detail/index.tsx`**
- パラメータからIDを取得
- 動的データ取得実装
- 404ページ対応

#### D2. LP系コンポーネント (優先度：中)

**`src/feature/lp/components/ProductGallerySection.tsx`**
- 製品データの動的取得
- パフォーマンス最適化

**`src/feature/lp/components/NewsSection.tsx`**
- ニュースデータの動的取得
- ページング機能（必要に応じて）

**`src/feature/lp/components/TestimonialsSection.tsx`**
- レビューデータの動的取得
- 評価システムとの連携（将来的）

**`src/feature/lp/components/ProductComparisonSection.tsx`**
- 製品比較データの動的取得（必要に応じて）

### E. 追加機能・改善

#### E1. ローディング・エラー処理
- **作業**: 全コンポーネントにローディング状態とエラー処理を追加
- **優先度**: 中

#### E2. キャッシュ機能
- **作業**: React QueryまたはSWRの導入検討
- **優先度**: 低

#### E3. 画像最適化
- **作業**: Next.js Image コンポーネントの適用
- **優先度**: 低

## 作業優先順位

### フェーズ1：基盤構築（必須）
1. 依存関係追加
2. 環境変数設定
3. Supabaseクライアント設定
4. 共通型定義
5. API関数群作成

### フェーズ2：ギャラリー機能（高優先度）
1. ギャラリー関連カスタムフック
2. GalleryGrid修正
3. GalleryFilter修正
4. GalleryStats修正
5. GalleryDetail修正

### フェーズ3：LP機能（中優先度）
1. LP関連カスタムフック
2. ProductGallerySection修正
3. NewsSection修正
4. TestimonialsSection修正

### フェーズ4：最適化・改善（低優先度）
1. ローディング・エラー処理
2. パフォーマンス最適化
3. キャッシュ機能
4. 画像最適化

## 注意点

### データ構造の差異
- フロントエンドの `images` 配列 ↔ DB の `portfolio_images` テーブル
- フロントエンドの `tags` 配列 ↔ DB の `portfolio_tags` テーブル
- フロントエンドの `specifications` オブジェクト ↔ DB の `portfolio_specifications` テーブル

### パフォーマンス考慮
- 画像の遅延読み込み
- 必要なデータのみ取得（SELECT最適化）
- フィルター処理の効率化

### エラーハンドリング
- ネットワークエラー
- データ不整合
- 認証エラー（将来的）

## 完了目標
- ダミーデータの完全除去
- Supabaseからのリアルデータ表示
- フィルター・検索機能の正常動作
- パフォーマンスの最適化
- エラーハンドリングの実装