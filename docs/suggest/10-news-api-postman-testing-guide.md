# News API Postman テストガイド

## 事前準備

### 1. 環境変数設定
`.env` ファイルを作成し、以下の内容を設定：

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
SECRET_KEY=your-secret-key-here-minimum-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000"]

# Environment
ENVIRONMENT=development
```

### 2. サーバー起動
```bash
# プロジェクトルートディレクトリで実行
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# またはDocker使用の場合
docker-compose up --build backend
```

### 3. サーバー確認
- ブラウザで `http://localhost:8000` にアクセス
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 4. データベース準備
Supabaseで以下のSQLファイルを順番に実行：
```sql
-- テーブル作成
supabase/insert-table/06-create-news-table.sql
supabase/insert-table/07-create-news-images-table.sql
supabase/insert-table/08-create-news-tags-table.sql
supabase/insert-table/09-create-news-views-table.sql
supabase/insert-table/10-create-news-updated-at-trigger.sql

-- ダミーデータ投入
supabase/insert-dummy-data/05-insert-news.sql
supabase/insert-dummy-data/06-insert-news-tags.sql
supabase/insert-dummy-data/07-insert-news-images.sql
supabase/insert-dummy-data/08-insert-news-views.sql
```

## Postman 設定

### 1. Environment 変数
Postmanで新しいEnvironmentを作成し、以下の変数を設定：

| 変数名 | 値 | 説明 |
|--------|----|----|
| `base_url` | `http://localhost:8000` | API ベースURL |
| `api_v1` | `{{base_url}}/api/v1` | API v1 ベースURL |
| `sample_news_id` | `550e8400-e29b-41d4-a716-446655440001` | テスト用ニュースID |

### 2. Collection 作成
新しいCollectionを作成：`News API Tests`

## テスト項目

### A. ヘルスチェック系

#### A1. News サービス ヘルスチェック
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/health`
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "News service is healthy"
  }
  ```

### B. ニュース一覧取得

#### B1. 基本的なニュース一覧取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news`
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "ニュース一覧を取得しました",
    "data": [
      {
        "id": "uuid",
        "title": "記事タイトル",
        "category": "新商品",
        "excerpt": "記事の概要",
        "featured_image_url": "https://...",
        "author": "著者名",
        "read_time_minutes": 3,
        "view_count": 1250,
        "is_featured": true,
        "published_at": "2024-06-23T10:00:00",
        "tags": ["タグ1", "タグ2"]
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 12,
      "total": 12,
      "total_pages": 1,
      "has_next": false,
      "has_prev": false
    }
  }
  ```

#### B2. カテゴリフィルター付きニュース一覧
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?category=新商品`
- **期待結果**: 新商品カテゴリのニュースのみ返却

#### B3. 年度フィルター付きニュース一覧
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?year=2024`
- **期待結果**: 2024年の記事のみ返却

#### B4. 検索機能
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?search=アクリル`
- **期待結果**: "アクリル"を含む記事のみ返却

#### B5. 注目記事のみ
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?featured=true`
- **期待結果**: 注目記事のみ返却

#### B6. ページング
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?page=1&page_size=5`
- **期待結果**: 5件ずつページング

#### B7. ソート機能
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?sort_by=view_count&sort_order=desc`
- **期待結果**: 閲覧数の多い順でソート

### C. ニュース詳細取得

#### C1. 有効なニュース詳細取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/{{sample_news_id}}`
- **期待結果**: 
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "新型アクリルスタンドシリーズ発売開始",
    "category": "新商品",
    "excerpt": "より耐久性の高い新素材を使用した...",
    "content": "<p>この度、Ghoona Goodsでは...</p>",
    "featured_image_url": "https://...",
    "author": "Ghoona Goods 開発チーム",
    "read_time_minutes": 3,
    "view_count": 1250,
    "is_featured": true,
    "published_at": "2024-06-23T10:00:00",
    "images": [
      {
        "id": "uuid",
        "image_url": "https://...",
        "alt_text": "画像の説明",
        "caption": "画像キャプション",
        "sort_order": 1,
        "image_type": "content"
      }
    ],
    "tags": [
      {
        "id": "uuid",
        "tag_name": "新商品"
      }
    ]
  }
  ```

#### C2. 存在しないニュース詳細取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/00000000-0000-0000-0000-000000000000`
- **期待結果**: 
  ```json
  {
    "detail": "ニュースが見つかりませんでした"
  }
  ```
- **HTTPステータス**: `404`

#### C3. 無効なUUID形式
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/invalid-uuid`
- **期待結果**: バリデーションエラー
- **HTTPステータス**: `422`

### D. 閲覧数更新

#### D1. 正常な閲覧数更新
- **Method**: `POST`
- **URL**: `{{api_v1}}/news/{{sample_news_id}}/view`
- **Headers**: 
  ```
  Content-Type: application/json
  User-Agent: Mozilla/5.0 (PostmanTest)
  ```
- **Body** (JSON):
  ```json
  {
    "user_agent": "Mozilla/5.0 (PostmanTest)"
  }
  ```
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "閲覧数を更新しました",
    "updated": true,
    "current_view_count": 1251
  }
  ```

#### D2. 重複閲覧検知
- **Method**: `POST`
- **URL**: `{{api_v1}}/news/{{sample_news_id}}/view`
- **Headers**: 同上
- **Body**: 同上
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "既に閲覧済みです",
    "updated": false,
    "current_view_count": 1251
  }
  ```

#### D3. 存在しないニュースの閲覧数更新
- **Method**: `POST`
- **URL**: `{{api_v1}}/news/00000000-0000-0000-0000-000000000000/view`
- **期待結果**: 
  ```json
  {
    "detail": "記事が見つかりませんでした"
  }
  ```
- **HTTPステータス**: `404`

### E. 関連記事取得

#### E1. 関連記事取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/{{sample_news_id}}/related`
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "関連記事を取得しました",
    "data": [
      {
        "id": "uuid",
        "title": "関連記事タイトル",
        "category": "新商品",
        "excerpt": "記事の概要",
        "featured_image_url": "https://...",
        "author": "著者名",
        "read_time_minutes": 3,
        "view_count": 1450,
        "is_featured": true,
        "published_at": "2024-06-05T11:30:00",
        "tags": ["新商品", "環境配慮"]
      }
    ]
  }
  ```

#### E2. 関連記事数制限
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/{{sample_news_id}}/related?limit=2`
- **期待結果**: 最大2件の関連記事

### F. 統計情報取得

#### F1. カテゴリ別統計
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/categories/stats`
- **期待結果**: 
  ```json
  {
    "total_news": 50,
    "total_views": 150000,
    "category_stats": [
      {
        "category": "新商品",
        "count": 15,
        "total_views": 50000
      },
      {
        "category": "お知らせ",
        "count": 20,
        "total_views": 40000
      }
    ]
  }
  ```

#### F2. フィルター用カテゴリ統計
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/categories/filters`
- **期待結果**: 
  ```json
  {
    "categories": [
      {
        "id": "all",
        "name": "すべて",
        "count": 120
      },
      {
        "id": "新商品",
        "name": "新商品",
        "count": 35
      }
    ]
  }
  ```

#### F3. 利用可能年度取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/meta/years`
- **期待結果**: 
  ```json
  {
    "success": true,
    "message": "利用可能な年度を取得しました",
    "data": [2024, 2023, 2022, 2021]
  }
  ```

### G. 特別エンドポイント

#### G1. 注目記事のみ取得
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/featured`
- **期待結果**: 注目記事のみのリスト

#### G2. 最新記事取得（ホームページ用）
- **Method**: `GET`
- **URL**: `{{api_v1}}/news/latest?limit=6`
- **期待結果**: 最新6件の記事

### H. エラーケーステスト

#### H1. 無効なページ番号
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?page=0`
- **期待結果**: バリデーションエラー
- **HTTPステータス**: `422`

#### H2. 無効なページサイズ
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?page_size=200`
- **期待結果**: バリデーションエラー
- **HTTPステータス**: `422`

#### H3. 無効な年度
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?year=1999`
- **期待結果**: バリデーションエラー
- **HTTPステータス**: `422`

#### H4. 無効なソート順
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?sort_order=invalid`
- **期待結果**: バリデーションエラー
- **HTTPステータス**: `422`

## パフォーマンステスト

### P1. 大量データページング
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?page=1&page_size=100`
- **期待結果**: レスポンス時間 < 2秒

### P2. 複雑なフィルター組み合わせ
- **Method**: `GET`
- **URL**: `{{api_v1}}/news?category=新商品&year=2024&search=アクリル&featured=true`
- **期待結果**: レスポンス時間 < 1秒

### P3. 連続閲覧数更新
- 同一記事に対して連続で閲覧数更新APIを呼び出し
- **期待結果**: 重複検知が正常に動作

## 自動テストスクリプト

### Postmanテストスクリプト例

#### ニュース一覧取得のテスト
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

pm.test("Response has data array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Response has pagination", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('pagination');
    pm.expect(jsonData.pagination).to.have.property('page');
    pm.expect(jsonData.pagination).to.have.property('total');
});
```

#### 閲覧数更新のテスト
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("View count incremented", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('current_view_count');
    pm.expect(jsonData.current_view_count).to.be.a('number');
    pm.expect(jsonData.current_view_count).to.be.above(0);
});
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. 接続エラー
```
Error: getaddrinfo ENOTFOUND localhost
```
**解決方法**: サーバーが起動していることを確認

#### 2. 認証エラー
```
{"detail": "Could not validate credentials"}
```
**解決方法**: 環境変数のSupabaseキーを確認

#### 3. データベース接続エラー
```
{"detail": "Database connection failed"}
```
**解決方法**: Supabase設定とテーブル作成を確認

#### 4. バリデーションエラー
```
{"detail": [{"type": "value_error", "loc": ["query", "page"], "msg": "ensure this value is greater than 0"}]}
```
**解決方法**: リクエストパラメータの形式を確認

## 注意事項

1. **重複閲覧防止**: 同一IPからの1時間以内の閲覧は重複とみなされます
2. **ページング制限**: 1回のリクエストで最大100件まで取得可能
3. **検索文字数**: 検索クエリは最大100文字まで
4. **タグ数制限**: 1記事あたり最大10個のタグ
5. **画像数制限**: 1記事あたり最大20枚の画像

## 完了目標

- [ ] 全エンドポイントが正常にレスポンスを返す
- [ ] フィルタリング機能が正しく動作する
- [ ] ページング機能が正しく動作する
- [ ] 閲覧数更新が重複防止と共に動作する
- [ ] エラーハンドリングが適切に動作する
- [ ] パフォーマンスが許容範囲内
- [ ] 統計情報が正確に取得できる