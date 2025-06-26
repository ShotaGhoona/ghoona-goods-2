# バックエンド ニュース機能実装計画

## 概要
FastAPI + Supabase を使用したニュース機能のバックエンド実装計画

## 既存アーキテクチャ分析

### 現在のプロジェクト構造
```
backend/
├── app/
│   ├── model/              # SQLAlchemyモデル
│   │   ├── base.py
│   │   └── portfolio_models.py
│   ├── schemas/            # Pydanticスキーマ
│   │   ├── base_schemas.py
│   │   ├── portfolio_schemas.py
│   │   └── portfolio_relation_schemas.py
│   ├── repositories/       # データアクセス層
│   │   ├── base_repository.py
│   │   └── portfolio_repository.py
│   ├── services/           # ビジネスロジック層
│   │   ├── base_service.py
│   │   └── portfolio_service.py
│   ├── api/v1/endpoints/   # APIエンドポイント
│   │   ├── health_endpoints.py
│   │   └── portfolio_endpoints.py
│   ├── core/               # 設定・DB接続
│   │   ├── config.py
│   │   └── database.py
│   └── dependencies.py     # 依存性注入
└── main.py                 # アプリケーションエントリーポイント
```

### 既存パターンの踏襲
Portfolio機能の実装パターンをニュース機能にも適用

## 実装計画

### Phase 1: モデル層実装

#### 1.1 Newsモデル作成
**ファイル**: `backend/app/model/news_models.py`

```python
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from .base import BaseModel

class NewsStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    SCHEDULED = "scheduled"
    ARCHIVED = "archived"

class NewsCategory(str, enum.Enum):
    NEW_PRODUCT = "新商品"
    ANNOUNCEMENT = "お知らせ"
    CAMPAIGN = "キャンペーン"
    TECHNOLOGY = "技術"
    EVENT = "イベント"

class ImageType(str, enum.Enum):
    FEATURED = "featured"
    CONTENT = "content"
    GALLERY = "gallery"

class News(BaseModel):
    __tablename__ = "news"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    category = Column(Enum(NewsCategory), nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)
    featured_image_url = Column(String(500))
    featured_image_alt = Column(String(255))
    author = Column(String(100), default="Ghoona Goods")
    read_time_minutes = Column(Integer, default=3)
    view_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    status = Column(Enum(NewsStatus), default=NewsStatus.DRAFT)
    sort_order = Column(Integer, default=0)
    published_at = Column(DateTime(timezone=True))
    
    # リレーション
    images = relationship("NewsImage", back_populates="news", cascade="all, delete-orphan")
    tags = relationship("NewsTag", back_populates="news", cascade="all, delete-orphan")
    views = relationship("NewsView", back_populates="news", cascade="all, delete-orphan")

class NewsImage(BaseModel):
    __tablename__ = "news_images"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    news_id = Column(UUID(as_uuid=True), ForeignKey("news.id"), nullable=False)
    image_url = Column(String(500), nullable=False)
    alt_text = Column(String(255))
    caption = Column(Text)
    sort_order = Column(Integer, default=0)
    image_type = Column(Enum(ImageType), default=ImageType.CONTENT)
    
    # リレーション
    news = relationship("News", back_populates="images")

class NewsTag(BaseModel):
    __tablename__ = "news_tags"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    news_id = Column(UUID(as_uuid=True), ForeignKey("news.id"), nullable=False)
    tag_name = Column(String(50), nullable=False)
    
    # リレーション
    news = relationship("News", back_populates="tags")

class NewsView(BaseModel):
    __tablename__ = "news_views"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    news_id = Column(UUID(as_uuid=True), ForeignKey("news.id"), nullable=False)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    viewed_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    
    # リレーション
    news = relationship("News", back_populates="views")
```

### Phase 2: スキーマ層実装

#### 2.1 Newsスキーマ作成
**ファイル**: `backend/app/schemas/news_schemas.py`

```python
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, validator
from .base_schemas import BaseResponse

class NewsTagCreate(BaseModel):
    tag_name: str = Field(..., max_length=50)

class NewsTagResponse(BaseModel):
    id: str
    tag_name: str
    
    class Config:
        from_attributes = True

class NewsImageCreate(BaseModel):
    image_url: str = Field(..., max_length=500)
    alt_text: Optional[str] = Field(None, max_length=255)
    caption: Optional[str] = None
    sort_order: int = Field(default=0)
    image_type: str = Field(default="content")

class NewsImageResponse(BaseModel):
    id: str
    image_url: str
    alt_text: Optional[str]
    caption: Optional[str]
    sort_order: int
    image_type: str
    
    class Config:
        from_attributes = True

class NewsCreate(BaseModel):
    title: str = Field(..., max_length=255)
    category: str
    excerpt: Optional[str] = None
    content: str
    featured_image_url: Optional[str] = Field(None, max_length=500)
    featured_image_alt: Optional[str] = Field(None, max_length=255)
    author: str = Field(default="Ghoona Goods", max_length=100)
    read_time_minutes: int = Field(default=3, ge=1)
    is_featured: bool = Field(default=False)
    status: str = Field(default="draft")
    sort_order: int = Field(default=0)
    published_at: Optional[datetime] = None
    images: List[NewsImageCreate] = Field(default=[])
    tags: List[NewsTagCreate] = Field(default=[])

class NewsUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    category: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image_url: Optional[str] = Field(None, max_length=500)
    featured_image_alt: Optional[str] = Field(None, max_length=255)
    author: Optional[str] = Field(None, max_length=100)
    read_time_minutes: Optional[int] = Field(None, ge=1)
    is_featured: Optional[bool] = None
    status: Optional[str] = None
    sort_order: Optional[int] = None
    published_at: Optional[datetime] = None

class NewsResponse(BaseModel):
    id: str
    title: str
    category: str
    excerpt: Optional[str]
    content: str
    featured_image_url: Optional[str]
    featured_image_alt: Optional[str]
    author: str
    read_time_minutes: int
    view_count: int
    is_featured: bool
    status: str
    sort_order: int
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    images: List[NewsImageResponse] = []
    tags: List[NewsTagResponse] = []
    
    class Config:
        from_attributes = True

class NewsListItem(BaseModel):
    id: str
    title: str
    category: str
    excerpt: Optional[str]
    featured_image_url: Optional[str]
    author: str
    read_time_minutes: int
    view_count: int
    is_featured: bool
    published_at: Optional[datetime]
    tags: List[str] = []
    
    class Config:
        from_attributes = True

class NewsListResponse(BaseResponse):
    data: List[NewsListItem]
    pagination: dict

class NewsCategoryStats(BaseModel):
    category: str
    count: int
    total_views: int

class NewsStatsResponse(BaseResponse):
    data: List[NewsCategoryStats]
```

### Phase 3: リポジトリ層実装

#### 3.1 Newsリポジトリ作成
**ファイル**: `backend/app/repositories/news_repository.py`

```python
from typing import List, Optional, Dict, Any
from sqlalchemy import and_, or_, func, desc, asc
from sqlalchemy.orm import Session, joinedload
from datetime import datetime, timedelta

from .base_repository import BaseRepository
from ..model.news_models import News, NewsImage, NewsTag, NewsView, NewsCategory, NewsStatus
from ..schemas.news_schemas import NewsCreate, NewsUpdate

class NewsRepository(BaseRepository[News, NewsCreate, NewsUpdate]):
    def __init__(self, db: Session):
        super().__init__(News, db)
    
    def get_published_news(
        self,
        skip: int = 0,
        limit: int = 10,
        category: Optional[str] = None,
        year: Optional[int] = None,
        search: Optional[str] = None,
        featured_only: bool = False,
        order_by: str = "published_at",
        order_direction: str = "desc"
    ) -> List[News]:
        """公開されたニュース一覧を取得"""
        query = self.db.query(News).options(
            joinedload(News.tags),
            joinedload(News.images)
        ).filter(
            News.status == NewsStatus.PUBLISHED,
            or_(News.published_at.is_(None), News.published_at <= func.now())
        )
        
        # フィルター適用
        if category:
            query = query.filter(News.category == category)
        
        if year:
            query = query.filter(func.extract('year', News.published_at) == year)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    News.title.ilike(search_term),
                    News.excerpt.ilike(search_term),
                    News.content.ilike(search_term)
                )
            )
        
        if featured_only:
            query = query.filter(News.is_featured == True)
        
        # ソート
        if order_direction.lower() == "desc":
            order_func = desc
        else:
            order_func = asc
        
        if order_by == "published_at":
            query = query.order_by(order_func(News.published_at))
        elif order_by == "view_count":
            query = query.order_by(order_func(News.view_count))
        elif order_by == "created_at":
            query = query.order_by(order_func(News.created_at))
        
        # 注目記事を優先表示
        query = query.order_by(desc(News.is_featured))
        
        return query.offset(skip).limit(limit).all()
    
    def get_by_id_with_relations(self, news_id: str) -> Optional[News]:
        """関連データを含むニュース詳細取得"""
        return self.db.query(News).options(
            joinedload(News.images),
            joinedload(News.tags)
        ).filter(
            News.id == news_id,
            News.status == NewsStatus.PUBLISHED
        ).first()
    
    def get_related_news(self, news_id: str, category: str, limit: int = 3) -> List[News]:
        """関連記事取得"""
        return self.db.query(News).filter(
            News.id != news_id,
            News.category == category,
            News.status == NewsStatus.PUBLISHED
        ).order_by(desc(News.published_at)).limit(limit).all()
    
    def get_category_stats(self) -> List[Dict[str, Any]]:
        """カテゴリ別統計取得"""
        return self.db.query(
            News.category,
            func.count(News.id).label('count'),
            func.sum(News.view_count).label('total_views')
        ).filter(
            News.status == NewsStatus.PUBLISHED
        ).group_by(News.category).all()
    
    def increment_view_count(self, news_id: str) -> bool:
        """閲覧数更新"""
        result = self.db.query(News).filter(News.id == news_id).update(
            {News.view_count: News.view_count + 1}
        )
        self.db.commit()
        return result > 0
    
    def record_view(self, news_id: str, ip_address: str, user_agent: str) -> bool:
        """閲覧履歴記録（重複チェック付き）"""
        # 1時間以内の同一IPからのアクセスをチェック
        recent_view = self.db.query(NewsView).filter(
            NewsView.news_id == news_id,
            NewsView.ip_address == ip_address,
            NewsView.viewed_at > func.now() - timedelta(hours=1)
        ).first()
        
        if recent_view:
            return False  # 重複アクセス
        
        # 新しい閲覧記録を作成
        view_record = NewsView(
            news_id=news_id,
            ip_address=ip_address,
            user_agent=user_agent
        )
        self.db.add(view_record)
        self.db.commit()
        return True
    
    def get_total_count(
        self,
        category: Optional[str] = None,
        year: Optional[int] = None,
        search: Optional[str] = None,
        featured_only: bool = False
    ) -> int:
        """条件に合致するニュース総数取得"""
        query = self.db.query(News).filter(
            News.status == NewsStatus.PUBLISHED
        )
        
        # フィルター適用（get_published_newsと同じロジック）
        if category:
            query = query.filter(News.category == category)
        
        if year:
            query = query.filter(func.extract('year', News.published_at) == year)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    News.title.ilike(search_term),
                    News.excerpt.ilike(search_term),
                    News.content.ilike(search_term)
                )
            )
        
        if featured_only:
            query = query.filter(News.is_featured == True)
        
        return query.count()
```

### Phase 4: サービス層実装

#### 4.1 Newsサービス作成
**ファイル**: `backend/app/services/news_service.py`

```python
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from .base_service import BaseService
from ..repositories.news_repository import NewsRepository
from ..model.news_models import News
from ..schemas.news_schemas import (
    NewsCreate, NewsUpdate, NewsResponse, NewsListItem, 
    NewsListResponse, NewsCategoryStats, NewsStatsResponse
)

class NewsService(BaseService[News, NewsCreate, NewsUpdate]):
    def __init__(self, db: Session):
        super().__init__(NewsRepository(db), NewsResponse)
        self.repository = NewsRepository(db)
    
    def get_news_list(
        self,
        page: int = 1,
        limit: int = 12,
        category: Optional[str] = None,
        year: Optional[int] = None,
        search: Optional[str] = None,
        featured_only: bool = False,
        order_by: str = "published_at",
        order_direction: str = "desc"
    ) -> NewsListResponse:
        """ニュース一覧取得（ページング付き）"""
        
        # ページング計算
        skip = (page - 1) * limit
        
        # データ取得
        news_list = self.repository.get_published_news(
            skip=skip,
            limit=limit,
            category=category,
            year=year,
            search=search,
            featured_only=featured_only,
            order_by=order_by,
            order_direction=order_direction
        )
        
        # 総数取得
        total_count = self.repository.get_total_count(
            category=category,
            year=year,
            search=search,
            featured_only=featured_only
        )
        
        # レスポンス形式に変換
        news_items = []
        for news in news_list:
            tags = [tag.tag_name for tag in news.tags]
            news_item = NewsListItem(
                id=str(news.id),
                title=news.title,
                category=news.category,
                excerpt=news.excerpt,
                featured_image_url=news.featured_image_url,
                author=news.author,
                read_time_minutes=news.read_time_minutes,
                view_count=news.view_count,
                is_featured=news.is_featured,
                published_at=news.published_at,
                tags=tags
            )
            news_items.append(news_item)
        
        # ページング情報
        total_pages = (total_count + limit - 1) // limit
        pagination = {
            "page": page,
            "limit": limit,
            "total": total_count,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
        
        return NewsListResponse(
            success=True,
            message="ニュース一覧を取得しました",
            data=news_items,
            pagination=pagination
        )
    
    def get_news_detail(self, news_id: str) -> NewsResponse:
        """ニュース詳細取得"""
        news = self.repository.get_by_id_with_relations(news_id)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="ニュースが見つかりませんでした"
            )
        
        return NewsResponse.from_orm(news)
    
    def get_related_news(self, news_id: str, limit: int = 3) -> List[NewsListItem]:
        """関連記事取得"""
        # まず対象記事を取得してカテゴリを確認
        news = self.repository.get_by_id(news_id)
        if not news:
            return []
        
        related_news = self.repository.get_related_news(
            news_id=news_id,
            category=news.category,
            limit=limit
        )
        
        return [
            NewsListItem(
                id=str(news.id),
                title=news.title,
                category=news.category,
                excerpt=news.excerpt,
                featured_image_url=news.featured_image_url,
                author=news.author,
                read_time_minutes=news.read_time_minutes,
                view_count=news.view_count,
                is_featured=news.is_featured,
                published_at=news.published_at,
                tags=[]
            )
            for news in related_news
        ]
    
    def increment_view(self, news_id: str, ip_address: str, user_agent: str) -> bool:
        """閲覧数更新"""
        # 閲覧履歴記録（重複チェック）
        is_new_view = self.repository.record_view(news_id, ip_address, user_agent)
        
        if is_new_view:
            # 新規閲覧の場合のみカウント更新
            return self.repository.increment_view_count(news_id)
        
        return False  # 重複閲覧
    
    def get_category_statistics(self) -> NewsStatsResponse:
        """カテゴリ別統計取得"""
        stats = self.repository.get_category_stats()
        
        category_stats = [
            NewsCategoryStats(
                category=stat.category,
                count=stat.count,
                total_views=stat.total_views or 0
            )
            for stat in stats
        ]
        
        return NewsStatsResponse(
            success=True,
            message="統計情報を取得しました",
            data=category_stats
        )
    
    def get_available_years(self) -> List[int]:
        """利用可能な年度一覧取得"""
        # 実装例：published_atから年度を抽出
        years = self.repository.db.query(
            func.extract('year', News.published_at).label('year')
        ).filter(
            News.status == NewsStatus.PUBLISHED,
            News.published_at.isnot(None)
        ).distinct().order_by(desc('year')).all()
        
        return [int(year[0]) for year in years if year[0]]
```

### Phase 5: API エンドポイント実装

#### 5.1 News エンドポイント作成
**ファイル**: `backend/app/api/v1/endpoints/news_endpoints.py`

```python
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....services.news_service import NewsService
from ....schemas.news_schemas import NewsResponse, NewsListResponse, NewsStatsResponse

router = APIRouter(prefix="/news", tags=["news"])

def get_news_service(db: Session = Depends(get_db)) -> NewsService:
    return NewsService(db)

@router.get("/", response_model=NewsListResponse)
async def get_news_list(
    page: int = Query(1, ge=1, description="ページ番号"),
    limit: int = Query(12, ge=1, le=100, description="1ページあたりの件数"),
    category: Optional[str] = Query(None, description="カテゴリフィルター"),
    year: Optional[int] = Query(None, description="年度フィルター"),
    search: Optional[str] = Query(None, description="検索キーワード"),
    featured: Optional[bool] = Query(None, description="注目記事のみ"),
    order_by: str = Query("published_at", description="ソート項目"),
    order_direction: str = Query("desc", regex="^(asc|desc)$", description="ソート方向"),
    service: NewsService = Depends(get_news_service)
):
    """
    ニュース一覧を取得します。
    
    - **page**: ページ番号（1から開始）
    - **limit**: 1ページあたりの件数（最大100件）
    - **category**: カテゴリでフィルタリング
    - **year**: 年度でフィルタリング
    - **search**: タイトル・本文で検索
    - **featured**: 注目記事のみ取得
    - **order_by**: ソート項目（published_at, view_count, created_at）
    - **order_direction**: ソート方向（asc, desc）
    """
    return service.get_news_list(
        page=page,
        limit=limit,
        category=category,
        year=year,
        search=search,
        featured_only=featured or False,
        order_by=order_by,
        order_direction=order_direction
    )

@router.get("/{news_id}", response_model=NewsResponse)
async def get_news_detail(
    news_id: str,
    service: NewsService = Depends(get_news_service)
):
    """
    ニュース詳細を取得します。
    
    - **news_id**: ニュースID
    """
    return service.get_news_detail(news_id)

@router.post("/{news_id}/view")
async def increment_news_view(
    news_id: str,
    request: Request,
    service: NewsService = Depends(get_news_service)
):
    """
    ニュースの閲覧数を増加させます。
    
    - **news_id**: ニュースID
    """
    # クライアント情報取得
    ip_address = request.client.host
    user_agent = request.headers.get("user-agent", "")
    
    # 閲覧数更新
    updated = service.increment_view(news_id, ip_address, user_agent)
    
    return {
        "success": True,
        "message": "閲覧数を更新しました" if updated else "既に閲覧済みです",
        "updated": updated
    }

@router.get("/{news_id}/related")
async def get_related_news(
    news_id: str,
    limit: int = Query(3, ge=1, le=10, description="取得件数"),
    service: NewsService = Depends(get_news_service)
):
    """
    関連記事を取得します。
    
    - **news_id**: 基準となるニュースID
    - **limit**: 取得件数（最大10件）
    """
    related_news = service.get_related_news(news_id, limit)
    
    return {
        "success": True,
        "message": "関連記事を取得しました",
        "data": related_news
    }

@router.get("/categories/stats", response_model=NewsStatsResponse)
async def get_category_statistics(
    service: NewsService = Depends(get_news_service)
):
    """
    カテゴリ別統計情報を取得します。
    """
    return service.get_category_statistics()

@router.get("/meta/years")
async def get_available_years(
    service: NewsService = Depends(get_news_service)
):
    """
    利用可能な年度一覧を取得します。
    """
    years = service.get_available_years()
    
    return {
        "success": True,
        "message": "利用可能な年度を取得しました",
        "data": years
    }
```

### Phase 6: ルーティング設定更新

#### 6.1 メインルーター更新
**ファイル**: `backend/app/api/v1/__init__.py`

```python
from fastapi import APIRouter
from .endpoints import health_endpoints, portfolio_endpoints, news_endpoints

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(health_endpoints.router)
api_router.include_router(portfolio_endpoints.router)
api_router.include_router(news_endpoints.router)  # 追加
```

## 実装スケジュール

### 週1: 基盤構築
- [ ] モデル定義実装
- [ ] スキーマ定義実装
- [ ] Supabaseマイグレーション作成・実行

### 週2: データアクセス層
- [ ] リポジトリ実装
- [ ] 単体テスト作成
- [ ] データベース接続確認

### 週3: ビジネスロジック層
- [ ] サービス層実装
- [ ] エラーハンドリング実装
- [ ] ビジネスロジックテスト

### 週4: API層・統合
- [ ] エンドポイント実装
- [ ] API ドキュメント生成
- [ ] 統合テスト・デバッグ

## テスト戦略

### 単体テスト
- リポジトリ層のデータアクセステスト
- サービス層のビジネスロジックテスト
- スキーマのバリデーションテスト

### 統合テスト
- API エンドポイントの動作確認
- データベース操作の整合性確認
- パフォーマンステスト

### 手動テスト
- フロントエンドとの結合テスト
- ユーザーシナリオベーステスト

## パフォーマンス考慮事項

### データベース最適化
- 適切なインデックス設計
- N+1問題の回避（eager loading）
- クエリの最適化

### キャッシュ戦略
- 静的データのキャッシュ（カテゴリ情報など）
- 閲覧数の非同期更新
- CDN活用による画像配信最適化

### スケーラビリティ
- ページング機能による大量データ対応
- 非同期処理の活用
- 負荷分散への対応準備

## 本計画の完了目標

1. **機能完全性**: 全ニュース機能がAPIとして提供される
2. **パフォーマンス**: レスポンス時間が適切な範囲内
3. **保守性**: コードが既存パターンに従い保守しやすい
4. **拡張性**: 将来的な機能追加に対応できる設計
5. **品質**: 適切なテストカバレッジを確保