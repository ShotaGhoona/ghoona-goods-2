"""
News-related API schemas.
"""
from datetime import datetime
from typing import Optional, List, Literal, Dict, Union
from uuid import UUID
from pydantic import BaseModel, Field, validator
from .base_schemas import FilterParams, PaginatedResponse


# Type definitions
CategoryType = Literal["新商品", "お知らせ", "キャンペーン", "技術", "イベント"]
StatusType = Literal["draft", "published", "scheduled", "archived"]
ImageType = Literal["featured", "content", "gallery"]


class NewsBase(BaseModel):
    """Base news schema with common fields."""
    
    title: str = Field(..., min_length=1, max_length=255, description="News title")
    category: CategoryType = Field(..., description="News category")
    excerpt: Optional[str] = Field(None, description="News excerpt/summary")
    content: str = Field(..., min_length=1, description="News content (HTML)")
    featured_image_url: Optional[str] = Field(None, max_length=500, description="Featured image URL")
    featured_image_alt: Optional[str] = Field(None, max_length=255, description="Featured image alt text")
    author: str = Field(default="Ghoona Goods", max_length=100, description="Article author")
    read_time_minutes: int = Field(default=3, ge=1, le=60, description="Estimated read time in minutes")
    is_featured: bool = Field(default=False, description="Is featured article")
    status: StatusType = Field(default="draft", description="Publication status")
    sort_order: int = Field(default=0, description="Display sort order")
    published_at: Optional[datetime] = Field(None, description="Publication date and time")


class NewsImageBase(BaseModel):
    """Base news image schema."""
    
    image_url: str = Field(..., min_length=1, max_length=500, description="Image URL")
    alt_text: Optional[str] = Field(None, max_length=255, description="Alternative text for accessibility")
    caption: Optional[str] = Field(None, description="Image caption")
    sort_order: int = Field(default=0, description="Image display order")
    image_type: ImageType = Field(default="content", description="Image type")


class NewsTagBase(BaseModel):
    """Base news tag schema."""
    
    tag_name: str = Field(..., min_length=1, max_length=50, description="Tag name")


class NewsCreate(NewsBase):
    """Schema for creating new news."""
    
    images: List[NewsImageBase] = Field(default_factory=list, description="News images")
    tags: List[NewsTagBase] = Field(default_factory=list, description="News tags")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate title is not empty after stripping."""
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip()
    
    @validator('content')
    def validate_content(cls, v):
        """Validate content is not empty after stripping."""
        if not v.strip():
            raise ValueError("Content cannot be empty")
        return v.strip()
    
    @validator('featured_image_url')
    def validate_featured_image_url(cls, v):
        """Validate featured image URL format."""
        if v is None:
            return v
        if not v.strip():
            return None
        # Basic URL validation
        if not (v.startswith('http://') or v.startswith('https://')):
            raise ValueError("Featured image URL must start with http:// or https://")
        return v.strip()
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "新型アクリルスタンドシリーズ発売開始",
                "category": "新商品",
                "excerpt": "より耐久性の高い新素材を使用した新シリーズが登場",
                "content": "<p>この度、Ghoona Goodsでは新型アクリルスタンドシリーズの発売を開始いたします。</p>",
                "featured_image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
                "featured_image_alt": "新型アクリルスタンド",
                "author": "Ghoona Goods 開発チーム",
                "read_time_minutes": 3,
                "is_featured": True,
                "status": "published",
                "sort_order": 1,
                "published_at": "2024-06-23T10:00:00",
                "images": [
                    {
                        "image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
                        "alt_text": "製品画像",
                        "caption": "新型アクリルスタンド",
                        "sort_order": 1,
                        "image_type": "content"
                    }
                ],
                "tags": [
                    {"tag_name": "新商品"},
                    {"tag_name": "アクリルスタンド"}
                ]
            }
        }


class NewsUpdate(BaseModel):
    """Schema for updating existing news."""
    
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="News title")
    category: Optional[CategoryType] = Field(None, description="News category")
    excerpt: Optional[str] = Field(None, description="News excerpt/summary")
    content: Optional[str] = Field(None, min_length=1, description="News content (HTML)")
    featured_image_url: Optional[str] = Field(None, max_length=500, description="Featured image URL")
    featured_image_alt: Optional[str] = Field(None, max_length=255, description="Featured image alt text")
    author: Optional[str] = Field(None, max_length=100, description="Article author")
    read_time_minutes: Optional[int] = Field(None, ge=1, le=60, description="Estimated read time in minutes")
    is_featured: Optional[bool] = Field(None, description="Is featured article")
    status: Optional[StatusType] = Field(None, description="Publication status")
    sort_order: Optional[int] = Field(None, description="Display sort order")
    published_at: Optional[datetime] = Field(None, description="Publication date and time")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate title is not empty after stripping."""
        if v is not None and not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip() if v else v
    
    @validator('content')
    def validate_content(cls, v):
        """Validate content is not empty after stripping."""
        if v is not None and not v.strip():
            raise ValueError("Content cannot be empty")
        return v.strip() if v else v


class NewsImageResponse(NewsImageBase):
    """Schema for news image response."""
    
    id: UUID = Field(..., description="Image unique identifier")
    news_id: UUID = Field(..., description="News ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        from_attributes = True


class NewsTagResponse(NewsTagBase):
    """Schema for news tag response."""
    
    id: UUID = Field(..., description="Tag unique identifier")
    news_id: UUID = Field(..., description="News ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        from_attributes = True


class NewsResponse(NewsBase):
    """Schema for news response."""
    
    id: UUID = Field(..., description="News unique identifier")
    view_count: int = Field(default=0, ge=0, description="View count")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }


class NewsDetailResponse(NewsResponse):
    """Schema for detailed news response with relations."""
    
    images: List[NewsImageResponse] = Field(default_factory=list, description="News images")
    tags: List[NewsTagResponse] = Field(default_factory=list, description="News tags")


class NewsListItem(BaseModel):
    """Schema for news list item (simplified for list views)."""
    
    id: UUID = Field(..., description="News unique identifier")
    title: str = Field(..., description="News title")
    category: CategoryType = Field(..., description="News category")
    excerpt: Optional[str] = Field(None, description="News excerpt/summary")
    featured_image_url: Optional[str] = Field(None, description="Featured image URL")
    featured_image_alt: Optional[str] = Field(None, description="Featured image alt text")
    author: str = Field(..., description="Article author")
    read_time_minutes: int = Field(..., description="Estimated read time in minutes")
    view_count: int = Field(default=0, ge=0, description="View count")
    is_featured: bool = Field(..., description="Is featured article")
    published_at: Optional[datetime] = Field(None, description="Publication date and time")
    tags: List[str] = Field(default_factory=list, description="Tag names")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }


class NewsListResponse(PaginatedResponse[NewsListItem]):
    """Schema for paginated news list response."""
    pass


class NewsFilterParams(FilterParams):
    """News-specific filter parameters."""
    
    category: Optional[CategoryType] = Field(None, description="Filter by category")
    year: Optional[int] = Field(None, ge=2000, le=2100, description="Filter by year")
    search: Optional[str] = Field(None, min_length=1, max_length=100, description="Search in title and content")
    featured: Optional[bool] = Field(None, description="Filter featured articles only")
    status: Optional[StatusType] = Field(None, description="Filter by status")
    
    class Config:
        json_schema_extra = {
            "example": {
                "page": 1,
                "page_size": 12,
                "category": "新商品",
                "year": 2024,
                "search": "アクリル",
                "featured": True,
                "status": "published",
                "sort_by": "published_at",
                "sort_order": "desc"
            }
        }


class CategoryStats(BaseModel):
    """Category statistics schema."""
    
    category: CategoryType = Field(..., description="News category")
    count: int = Field(..., ge=0, description="Number of articles in this category")
    total_views: int = Field(..., ge=0, description="Total views for this category")
    
    class Config:
        json_schema_extra = {
            "example": {
                "category": "新商品",
                "count": 15,
                "total_views": 25000
            }
        }


class NewsStatsResponse(BaseModel):
    """News statistics response schema."""
    
    total_news: int = Field(..., ge=0, description="Total number of published articles")
    total_views: int = Field(..., ge=0, description="Total views across all articles")
    category_stats: List[CategoryStats] = Field(default_factory=list, description="Statistics by category")
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_news": 50,
                "total_views": 150000,
                "category_stats": [
                    {"category": "新商品", "count": 15, "total_views": 50000},
                    {"category": "お知らせ", "count": 20, "total_views": 40000},
                    {"category": "技術", "count": 10, "total_views": 35000}
                ]
            }
        }


class CategoryStatsResponse(BaseModel):
    """Category statistics response for filters."""
    
    categories: List[Dict[str, Union[str, int]]] = Field(..., description="Category statistics")
    
    class Config:
        json_schema_extra = {
            "example": {
                "categories": [
                    {"id": "all", "name": "すべて", "count": 120},
                    {"id": "新商品", "name": "新商品", "count": 35},
                    {"id": "お知らせ", "name": "お知らせ", "count": 28},
                    {"id": "キャンペーン", "name": "キャンペーン", "count": 22},
                    {"id": "技術", "name": "技術", "count": 20},
                    {"id": "イベント", "name": "イベント", "count": 15}
                ]
            }
        }


class NewsViewRequest(BaseModel):
    """Schema for news view tracking request."""
    
    user_agent: Optional[str] = Field(None, description="User agent string")
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        }


class NewsViewResponse(BaseModel):
    """Schema for news view tracking response."""
    
    success: bool = Field(..., description="Whether view was recorded")
    message: str = Field(..., description="Response message")
    updated: bool = Field(..., description="Whether view count was incremented")
    current_view_count: int = Field(..., ge=0, description="Current view count")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "閲覧数を更新しました",
                "updated": True,
                "current_view_count": 1251
            }
        }


class RelatedNewsResponse(BaseModel):
    """Schema for related news response."""
    
    success: bool = Field(..., description="Whether request was successful")
    message: str = Field(..., description="Response message")
    data: List[NewsListItem] = Field(default_factory=list, description="Related news articles")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "関連記事を取得しました",
                "data": [
                    {
                        "id": "550e8400-e29b-41d4-a716-446655440003",
                        "title": "エコ素材缶バッジの開発完了",
                        "category": "新商品",
                        "excerpt": "環境に配慮した新素材を使用した缶バッジが完成",
                        "featured_image_url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
                        "author": "Ghoona Goods 開発チーム",
                        "read_time_minutes": 3,
                        "view_count": 1450,
                        "is_featured": True,
                        "published_at": "2024-06-05T11:30:00",
                        "tags": ["新商品", "環境配慮", "缶バッジ"]
                    }
                ]
            }
        }


class AvailableYearsResponse(BaseModel):
    """Schema for available years response."""
    
    success: bool = Field(..., description="Whether request was successful")
    message: str = Field(..., description="Response message")
    data: List[int] = Field(default_factory=list, description="Available years")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "利用可能な年度を取得しました",
                "data": [2024, 2023, 2022, 2021]
            }
        }