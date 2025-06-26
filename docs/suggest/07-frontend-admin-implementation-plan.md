# Frontend Admin Implementation Plan

## 概要
Portfolio管理システムの管理画面として`frontend-admin`を新規作成し、Clerkを使用した認証・認可機能と共にCRUD操作を実装する。

## 技術スタック
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Clerk (管理者専用設定)
- **UI Components**: shadcn/ui + custom admin components
- **State Management**: React hooks + Context (将来的にZustand検討)
- **API Client**: fetch (既存のbase.service.tsパターン継承)

## ディレクトリ構成

```
frontend-admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with Clerk
│   │   ├── page.tsx                      # Dashboard home
│   │   ├── sign-in/[[...sign-in]]/       # Clerk sign-in pages
│   │   ├── sign-up/[[...sign-up]]/       # Clerk sign-up pages
│   │   ├── portfolios/
│   │   │   ├── page.tsx                  # Portfolio list view
│   │   │   ├── create/page.tsx           # Create portfolio
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx              # Portfolio detail/edit
│   │   │   │   └── images/page.tsx       # Image management
│   │   │   └── bulk/page.tsx             # Bulk operations
│   │   ├── categories/
│   │   │   ├── page.tsx                  # Category management
│   │   │   └── [id]/page.tsx             # Category edit
│   │   ├── tags/
│   │   │   ├── page.tsx                  # Tag management
│   │   │   └── [id]/page.tsx             # Tag edit
│   │   ├── users/
│   │   │   ├── page.tsx                  # User management
│   │   │   └── [id]/page.tsx             # User permissions
│   │   └── settings/
│   │       ├── page.tsx                  # General settings
│   │       └── permissions/page.tsx      # Permission management
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── AdminLayout.tsx           # Main admin layout
│   │   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   │   └── TopBar.tsx                # Top navigation bar
│   │   ├── ui/                           # shadcn/ui components
│   │   ├── common/
│   │   │   ├── DataTable.tsx             # Reusable table component
│   │   │   ├── FormField.tsx             # Form field wrapper
│   │   │   ├── Modal.tsx                 # Modal component
│   │   │   ├── ConfirmDialog.tsx         # Confirmation dialog
│   │   │   └── ImageUpload.tsx           # Image upload component
│   │   └── features/
│   │       ├── portfolios/
│   │       │   ├── PortfolioList.tsx     # Portfolio list table
│   │       │   ├── PortfolioForm.tsx     # Create/edit form
│   │       │   ├── PortfolioCard.tsx     # Portfolio card view
│   │       │   ├── PortfolioFilters.tsx  # Filter components
│   │       │   └── PortfolioStats.tsx    # Statistics dashboard
│   │       ├── categories/
│   │       │   ├── CategoryList.tsx
│   │       │   └── CategoryForm.tsx
│   │       ├── tags/
│   │       │   ├── TagList.tsx
│   │       │   └── TagForm.tsx
│   │       └── users/
│   │           ├── UserList.tsx
│   │           └── UserPermissions.tsx
│   ├── hooks/
│   │   ├── usePortfolios.ts              # Portfolio management hooks
│   │   ├── useCategories.ts              # Category management hooks
│   │   ├── useTags.ts                    # Tag management hooks
│   │   ├── useUsers.ts                   # User management hooks
│   │   ├── usePermissions.ts             # Permission management hooks
│   │   └── useImageUpload.ts             # Image upload hook
│   ├── services/
│   │   ├── api/
│   │   │   ├── base.service.ts           # Base API service
│   │   │   ├── portfolios.service.ts     # Portfolio API calls
│   │   │   ├── categories.service.ts     # Category API calls
│   │   │   ├── tags.service.ts           # Tag API calls
│   │   │   ├── users.service.ts          # User API calls
│   │   │   └── upload.service.ts         # File upload service
│   │   └── auth/
│   │       └── permissions.service.ts    # Permission checking service
│   ├── types/
│   │   ├── api.ts                        # API response types
│   │   ├── portfolios.ts                 # Portfolio related types
│   │   ├── categories.ts                 # Category types
│   │   ├── tags.ts                       # Tag types
│   │   ├── users.ts                      # User types
│   │   └── permissions.ts                # Permission types
│   ├── utils/
│   │   ├── constants.ts                  # App constants
│   │   ├── formatters.ts                 # Data formatting utilities
│   │   ├── validators.ts                 # Form validation
│   │   └── permissions.ts                # Permission checking utilities
│   └── styles/
│       └── globals.css                   # Global styles
├── public/
│   ├── logo-admin.png                    # Admin logo
│   └── favicon.ico                       # Admin favicon
├── middleware.ts                         # Clerk middleware
├── next.config.js                        # Next.js configuration
├── tailwind.config.js                    # Tailwind configuration
├── tsconfig.json                         # TypeScript configuration
├── package.json                          # Dependencies
└── .env.local                            # Environment variables
```

## 実装手順

### Phase 1: プロジェクト初期化
1. **Next.js アプリケーション作成**
   ```bash
   npx create-next-app@latest frontend-admin --typescript --tailwind --app
   ```

2. **Docker セットアップ**
   - Dockerfile作成
   - docker-compose.yml更新（frontend-admin追加）
   - Docker開発環境構築

3. **Clerk セットアップ**
   - Clerk プロジェクト作成（管理者専用）
   - Clerk SDK インストール・設定
   - サインイン/サインアップページ作成

4. **shadcn/ui セットアップ**
   - shadcn/ui 初期化
   - 基本コンポーネント追加（Button, Table, Form等）

### Phase 2: レイアウト・ナビゲーション
1. **AdminLayout コンポーネント作成**
   - サイドバー付きレイアウト
   - トップバー（ユーザー情報、ログアウト）
   - レスポンシブ対応

2. **サイドバーナビゲーション構造**
   - Dashboard
   - Portfolios (一覧、作成、編集)
   - Categories 管理
   - Tags 管理
   - Users 管理
   - Orders 管理（将来拡張）
   - Customers 管理（将来拡張）
   - Analytics（将来拡張）
   - Settings

### Phase 3: Portfolio管理機能
1. **Portfolio CRUD実装**
   - 一覧表示（フィルター、ソート、ページネーション）
   - 作成フォーム（画像アップロード対応）
   - 編集フォーム
   - 削除機能（ソフトデリート）

2. **Image管理**
   - 複数画像アップロード
   - 画像プレビュー
   - 画像順序変更
   - 画像削除

### Phase 4: 関連データ管理
1. **Category/Tag管理**
   - Category CRUD
   - Tag CRUD
   - Portfolio との関連付け

2. **Specifications管理**
   - 仕様情報の入力フォーム
   - テンプレート機能

### Phase 5: 認証・認可強化
1. **Permission システム**
   - Clerk Metadata でロール管理
   - 画面/機能レベルの権限制御
   - API レベルの権限チェック

2. **User管理**
   - 管理者ユーザー一覧
   - 権限割り当て
   - アクセスログ

## 環境変数設定

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=10000

# Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
```

## データベース拡張（Supabase）

```sql
-- Users テーブル（Clerkとの連携）
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'editor',
    permissions JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs テーブル
CREATE TABLE admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## セキュリティ考慮事項

1. **認証レベル**
   - Clerk による強固な認証
   - 管理画面専用のClerkプロジェクト

2. **認可レベル**
   - ロールベースアクセス制御（RBAC）
   - 画面レベル・機能レベルの権限チェック
   - API レベルでの権限検証

3. **監査ログ**
   - 全ての管理操作をログ記録
   - IP アドレス・User Agent の記録

## 今後の拡張性

1. **追加予定機能**
   - Orders 管理
   - Customers 管理
   - Analytics Dashboard
   - Notifications システム
   - Backup/Restore 機能

2. **技術的拡張**
   - React Query 導入（キャッシュ最適化）
   - Zustand 導入（複雑な状態管理）
   - WebSocket 対応（リアルタイム更新）

## 開発優先順位

1. **High Priority**: Portfolio CRUD, 認証・認可
2. **Medium Priority**: Image 管理, Category/Tag 管理
3. **Low Priority**: Analytics, 監査ログ, 通知機能

この構成により、maintainable で scalable な管理画面を構築できます。