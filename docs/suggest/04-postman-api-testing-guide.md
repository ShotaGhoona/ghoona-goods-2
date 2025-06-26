# Postman API テストガイド（認証対応版）

## 事前準備

### 1. 環境変数設定
`.env` ファイルを作成し、以下の内容を設定：

```env
# Supabase Configuration
SUPABASE_URL=https://yuchruohfdaiyboqgsaz.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Security
SECRET_KEY=your-secret-key-here-minimum-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_k6DmC3kF0Mtl1np4OM4tHhupVHVkO0vEuim0Lnla37
CLERK_ISSUER=https://blessed-eagle-50.clerk.accounts.dev

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]

# Environment
ENVIRONMENT=development
```

### 2. サーバー起動（Docker）
```bash
# プロジェクトルートディレクトリで実行
docker-compose up --build

# バックグラウンドで起動する場合
docker-compose up -d --build
```

### 3. サーバー確認
ブラウザで `http://localhost:8000` にアクセスし、APIが起動していることを確認

### 4. Docker環境でのログ確認
```bash
# すべてのサービスのログを確認
docker-compose logs

# バックエンドのログのみ確認
docker-compose logs backend

# リアルタイムでログを監視
docker-compose logs -f backend
```

## Postman 設定

### 1. Environment 変数
Postmanで新しいEnvironmentを作成し、以下の変数を設定：

| 変数名 | 値 | 説明 |
|--------|----|----|
| `base_url` | `http://localhost:8000` | API ベースURL |
| `api_v1` | `{{base_url}}/api/v1` | API v1 ベースURL |
| `public_api` | `{{api_v1}}/public` | パブリックAPI（認証不要）|
| `admin_api` | `{{api_v1}}/admin` | 管理者API（認証必要）|
| `clerk_token` | `your-jwt-token-here` | Clerk JWTトークン（テスト用）|

### 2. Collection 作成
新しいCollectionを作成：`Ghoona Goods API Tests`

### 3. 認証設定（管理者API用）
管理者APIテスト時は、Headers タブに以下を追加：
- **Key**: `Authorization`
- **Value**: `Bearer {{clerk_token}}`

## API エンドポイント構造

### パブリックAPI（認証不要）
- `GET /api/v1/public/portfolios` - ポートフォリオ一覧（公開データのみ）
- `GET /api/v1/public/portfolios/{id}` - ポートフォリオ詳細（アクティブのみ）
- `GET /api/v1/public/portfolios/stats/overview` - 基本統計情報
- `GET /api/v1/public/portfolios/stats/categories` - カテゴリ統計

### 管理者API（認証必要）
- `GET /api/v1/admin/portfolios` - ポートフォリオ一覧（全データ）
- `POST /api/v1/admin/portfolios` - ポートフォリオ作成
- `PUT /api/v1/admin/portfolios/{id}` - ポートフォリオ更新
- `DELETE /api/v1/admin/portfolios/{id}` - ポートフォリオ削除

### レガシーAPI（後方互換性）
- `GET /api/v1/portfolios` - 従来のエンドポイント（認証不要）

## テスト項目

### A. ヘルスチェック系

#### A1. 基本ヘルスチェック
- **Method**: `GET`
- **URL**: `{{base_url}}/health`
- **期待結果**: 
  ```json
  {
    "status": "healthy",
    "service": "ghoona-goods-api",
    "version": "1.0.0"
  }
  ```

#### A2. API v1 ヘルスチェック
- **Method**: `GET`
- **URL**: `{{api_v1}}/health`
- **期待結果**:
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "database_status": "connected"
  }
  ```

#### A3. 詳細ヘルスチェック
- **Method**: `GET`
- **URL**: `{{api_v1}}/health/detailed`
- **期待結果**: すべてのコンポーネントが `"status": "healthy"`

### B. パブリックAPI テスト（認証不要）

#### B1. パブリックポートフォリオ一覧取得（基本）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios`
- **確認項目**:
  - ステータスコード: 200
  - `success: true`
  - `data` 配列にアクティブなポートフォリオのみ
  - `pagination` オブジェクトの存在

#### B2. パブリックポートフォリオ一覧取得（フィルター付き）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios?category=original-badge&industry=anime&year=2024`
- **確認項目**:
  - フィルター条件に合致するアクティブデータのみ返却
  - 正しいページネーション情報

#### B3. パブリックポートフォリオ一覧取得（検索付き）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios?search=アニメ`
- **確認項目**:
  - 検索キーワードが含まれるアクティブポートフォリオのみ返却

#### B4. パブリックポートフォリオ詳細取得（存在する）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios/550e8400-e29b-41d4-a716-446655440001`
- **確認項目**:
  - ステータスコード: 200
  - アクティブなポートフォリオの詳細データが含まれる

#### B5. パブリックポートフォリオ詳細取得（下書き）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios/{draft_portfolio_id}`
- **確認項目**:
  - ステータスコード: 404
  - 下書きステータスのポートフォリオは表示されない

### C. 管理者API テスト（認証必要）

#### C1. 管理者ポートフォリオ一覧取得（認証なし）
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: 認証ヘッダーなし
- **確認項目**:
  - ステータスコード: 401
  - `"detail": "Not authenticated"`

#### C2. 管理者ポートフォリオ一覧取得（認証あり）
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **確認項目**:
  - ステータスコード: 200
  - `success: true`
  - 全ステータスのポートフォリオが含まれる

#### C3. 管理者ポートフォリオ詳細取得
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios/550e8400-e29b-41d4-a716-446655440001`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **確認項目**:
  - ステータスコード: 200
  - 詳細データ（images, tags, specifications）が含まれる

### D. レガシーAPI テスト（後方互換性）

#### D1. レガシーポートフォリオ一覧取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/portfolios`
- **確認項目**:
  - ステータスコード: 200
  - 従来と同じレスポンス形式

### E. 統計情報系

#### E1. パブリック統計取得
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios/stats/overview`
- **確認項目**:
  - ステータスコード: 200
  - `total_portfolios` 数値（アクティブのみ）
  - `total_quantity` 数値
  - `category_stats` 配列
  - `industry_stats` 配列
  - `year_stats` 配列

#### E2. 管理者統計取得
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios/stats/overview`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **確認項目**:
  - ステータスコード: 200
  - 全ステータスを含む統計情報

#### E3. カテゴリ統計取得
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios/stats/categories`
- **確認項目**:
  - `categories` 配列
  - 各カテゴリに `id`, `name`, `icon`, `count`

### F. CRUD操作テスト（管理者API）

#### F1. ポートフォリオ作成（認証なし）
- **Method**: `POST`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: 認証ヘッダーなし
- **確認項目**:
  - ステータスコード: 401
  - `"detail": "Not authenticated"`

#### F2. ポートフォリオ作成（認証あり）
- **Method**: `POST`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{clerk_token}}`
- **Body** (JSON):
  ```json
  {
    "title": "テスト用ポートフォリオ",
    "category": "original-badge",
    "industry": "corporate",
    "year": 2024,
    "quantity": 100,
    "description": "テスト用の説明",
    "long_description": "テスト用の詳細説明",
    "status": "draft",
    "sort_order": 1
  }
  ```
- **確認項目**:
  - ステータスコード: 201
  - 作成されたポートフォリオデータの返却

#### F3. ポートフォリオ更新
- **Method**: `PUT`
- **URL**: `{{admin_api}}/portfolios/{portfolio_id}`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **Body** (JSON):
  ```json
  {
    "title": "更新されたタイトル",
    "quantity": 150
  }
  ```
- **確認項目**:
  - ステータスコード: 200
  - 更新されたデータの返却

#### F4. ポートフォリオ削除
- **Method**: `DELETE`
- **URL**: `{{admin_api}}/portfolios/{portfolio_id}`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **確認項目**:
  - ステータスコード: 200
  - 削除成功メッセージ

### G. エラーハンドリング系

#### G1. 認証エラー（管理者API）
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: 認証ヘッダーなし
- **確認項目**:
  - ステータスコード: 401
  - `"detail": "Not authenticated"`

#### G2. 無効なトークン（管理者API）
- **Method**: `GET`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: `Authorization: Bearer invalid-token`
- **確認項目**:
  - ステータスコード: 401
  - 無効なトークンエラー

#### G3. 無効なパラメータ（ページ番号）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios?page=0`
- **確認項目**:
  - ステータスコード: 422
  - バリデーションエラーメッセージ

#### G4. 無効なパラメータ（カテゴリ）
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios?category=invalid-category`
- **確認項目**:
  - ステータスコード: 422
  - バリデーションエラーメッセージ

#### G5. 無効なUUID
- **Method**: `GET`
- **URL**: `{{public_api}}/portfolios/invalid-uuid`
- **確認項目**:
  - ステータスコード: 422
  - UUIDフォーマットエラー

#### G6. 作成時必須フィールド不足
- **Method**: `POST`
- **URL**: `{{admin_api}}/portfolios`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **Body** (JSON):
  ```json
  {
    "title": "不完全なデータ"
  }
  ```
- **確認項目**:
  - ステータスコード: 422
  - 必須フィールドエラーメッセージ

#### G7. 存在しないリソース削除
- **Method**: `DELETE`
- **URL**: `{{admin_api}}/portfolios/00000000-0000-0000-0000-000000000000`
- **Headers**: `Authorization: Bearer {{clerk_token}}`
- **確認項目**:
  - ステータスコード: 404
  - "Portfolio not found"

## 自動テストスクリプト（Postman Tests）

### 共通テスト（各リクエストに追加）

```javascript
// ステータスコードチェック
pm.test("Status code is success", function () {
    pm.response.to.have.status(200);
});

// レスポンス時間チェック
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Content-Type チェック
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});
```

### 成功レスポンス用テスト

```javascript
// 成功レスポンス構造チェック
pm.test("Response has success structure", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("success");
    pm.expect(jsonData).to.have.property("message");
    pm.expect(jsonData).to.have.property("timestamp");
});

// 成功フラグチェック
pm.test("Success flag is true", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});
```

### ページング用テスト

```javascript
// ページング構造チェック（新形式）
pm.test("Pagination structure is correct", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("pagination");
    pm.expect(jsonData.pagination).to.have.property("page");
    pm.expect(jsonData.pagination).to.have.property("page_size");
    pm.expect(jsonData.pagination).to.have.property("total_items");
    pm.expect(jsonData.pagination).to.have.property("total_pages");
    pm.expect(jsonData.pagination).to.have.property("has_next");
    pm.expect(jsonData.pagination).to.have.property("has_previous");
});
```

### 認証テスト用スクリプト

```javascript
// 認証エラーチェック
pm.test("Authentication error is correct", function () {
    if (pm.response.code === 401) {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property("detail");
        pm.expect(jsonData.detail).to.include("authenticated");
    }
});

// トークン有効性チェック
pm.test("Token is valid for admin endpoints", function () {
    if (pm.request.url.toString().includes("/admin/")) {
        pm.expect(pm.response.code).to.not.equal(401);
    }
});
```

### セキュリティテスト用スクリプト

```javascript
// データアクセス制御チェック
pm.test("Public API only shows active portfolios", function () {
    if (pm.request.url.toString().includes("/public/")) {
        const jsonData = pm.response.json();
        if (jsonData.data && Array.isArray(jsonData.data)) {
            jsonData.data.forEach(portfolio => {
                pm.expect(portfolio.status).to.equal("active");
            });
        }
    }
});

// CORS ヘッダーチェック
pm.test("CORS headers are present", function () {
    pm.expect(pm.response.headers.has("Access-Control-Allow-Origin")).to.be.true;
});
```

## チェックリスト

### 基本機能チェック
- [ ] サーバーが正常に起動する
- [ ] 基本ヘルスチェックが通る
- [ ] API v1 ヘルスチェックが通る
- [ ] データベース接続が正常

### パブリックAPI チェック（認証不要）
- [ ] パブリックポートフォリオ一覧取得
- [ ] カテゴリフィルターが正常動作
- [ ] 業界フィルターが正常動作
- [ ] 年度フィルターが正常動作
- [ ] 検索機能が正常動作
- [ ] ページングが正常動作
- [ ] ポートフォリオ詳細取得
- [ ] アクティブステータスのみ表示される
- [ ] 下書きステータスは表示されない

### 管理者API チェック（認証必要）
- [ ] 認証なしでアクセス拒否される
- [ ] 有効なトークンでアクセス可能
- [ ] 全ステータスのポートフォリオが見える
- [ ] ポートフォリオ作成が可能
- [ ] ポートフォリオ更新が可能
- [ ] ポートフォリオ削除が可能

### 認証・セキュリティチェック
- [ ] 管理者APIで401エラーが返る（認証なし）
- [ ] 無効なトークンで認証エラー
- [ ] トークンなしでCRUD操作が拒否される
- [ ] 適切なCORSヘッダーが設定されている
- [ ] JWTトークンの検証が動作する

### 統計情報チェック
- [ ] パブリック統計（アクティブのみ）
- [ ] 管理者統計（全ステータス）
- [ ] カテゴリ統計が正しく取得できる
- [ ] 統計数値の整合性

### エラーハンドリングチェック
- [ ] 認証エラー（401）
- [ ] 権限エラー（403）
- [ ] リソース未発見（404）
- [ ] バリデーションエラー（422）
- [ ] 無効なパラメータエラー
- [ ] 適切なHTTPステータスコード

### API設計チェック
- [ ] レガシーAPIが後方互換性を維持
- [ ] パブリック/管理者APIの分離が適切
- [ ] レスポンス形式の一貫性
- [ ] ページネーション形式の統一

### パフォーマンスチェック
- [ ] レスポンス時間（通常 < 2秒）
- [ ] 大量データでのページング性能
- [ ] 複雑なフィルター条件での性能
- [ ] 認証処理のオーバーヘッド確認

## トラブルシューティング

### よくある問題

1. **Docker 起動エラー**
   ```bash
   # コンテナの状態確認
   docker-compose ps
   
   # 特定のサービスのログ確認
   docker-compose logs backend
   
   # コンテナを完全にリセット
   docker-compose down -v
   docker-compose up --build
   ```

2. **認証エラー（401 Unauthorized）**
   - Clerk環境変数の確認（`CLERK_SECRET_KEY`, `CLERK_ISSUER`）
   - JWTトークンの有効性確認
   - トークンの形式確認（`Bearer {token}`）
   - Clerk設定の再確認

3. **管理者API アクセスエラー**
   ```bash
   # 管理者APIテスト（認証なし）
   curl http://localhost:8000/api/v1/admin/portfolios
   # 期待結果: {"detail":"Not authenticated"}
   
   # パブリックAPIテスト（認証不要）
   curl http://localhost:8000/api/v1/public/portfolios
   # 期待結果: 正常なデータ
   ```

4. **データベース接続エラー**
   - Supabase の設定確認
   - 環境変数の確認（`.env` ファイルの存在）
   - ネットワーク接続確認

5. **404 エラー**
   - UUID の形式確認
   - データの存在確認
   - パブリックAPIでは下書きステータスは404になる
   - soft delete されていないか確認

6. **422 バリデーションエラー**
   - リクエストパラメータの確認
   - データ型の確認
   - 必須フィールドの確認（`sort_order`追加など）

7. **500 内部サーバーエラー**
   - サーバーログの確認: `docker-compose logs backend`
   - データベースの状態確認
   - 環境変数の設定確認
   - JWT依存関係の確認（PyJWT, requests）

8. **CORS エラー**
   - フロントエンドのオリジンがCORS設定に含まれているか確認
   - 開発環境: `localhost:3000`, `localhost:3001`
   - 本番環境: 実際のドメインを追加

9. **ポート競合エラー**
   ```bash
   # ポートが使用されているか確認
   lsof -i :8000
   lsof -i :3000
   lsof -i :3001
   
   # 必要に応じてポートを変更
   # docker-compose.yml の ports セクションを修正
   ```

### 認証関連の確認コマンド

```bash
# 環境変数確認
docker-compose exec backend env | grep CLERK

# JWT依存関係確認
docker-compose exec backend pip list | grep -E "(PyJWT|requests)"

# 認証エンドポイント動作確認
curl -H "Authorization: Bearer invalid-token" http://localhost:8000/api/v1/admin/portfolios
```