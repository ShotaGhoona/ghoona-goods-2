"""
News-related database models.
"""
from datetime import datetime
from typing import Optional, List, Literal
from uuid import UUID
from pydantic import Field, validator
from .base import BaseModel, TimestampMixin, SoftDeleteMixin


# Type definitions for enums
CategoryType = Literal["新商品", "お知らせ", "キャンペーン", "技術", "イベント"]
StatusType = Literal["draft", "published", "scheduled", "archived"]
ImageType = Literal["featured", "content", "gallery"]


class News(BaseModel, TimestampMixin, SoftDeleteMixin):
    """News main model."""
    
    title: str = Field(..., min_length=1, max_length=255, description="News title")
    category: CategoryType = Field(..., description="News category")
    excerpt: Optional[str] = Field(None, description="News excerpt/summary")
    content: str = Field(..., min_length=1, description="News content (HTML)")
    featured_image_url: Optional[str] = Field(None, max_length=500, description="Featured image URL")
    featured_image_alt: Optional[str] = Field(None, max_length=255, description="Featured image alt text")
    author: str = Field(default="Ghoona Goods", max_length=100, description="Article author")
    read_time_minutes: int = Field(default=3, ge=1, le=60, description="Estimated read time in minutes")
    view_count: int = Field(default=0, ge=0, description="View count")
    is_featured: bool = Field(default=False, description="Is featured article")
    status: StatusType = Field(default="draft", description="Publication status")
    sort_order: int = Field(default=0, description="Display sort order")
    published_at: Optional[datetime] = Field(None, description="Publication date and time")
    
    # Relations (populated by queries)
    images: Optional[List["NewsImage"]] = Field(default=None, description="News images")
    tags: Optional[List["NewsTag"]] = Field(default=None, description="News tags")
    
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
    
    @validator('published_at')
    def validate_published_at(cls, v, values):
        """Validate published_at based on status."""
        status = values.get('status')
        if status == 'published' and v is None:
            return datetime.now()
        return v
    
    class Config:
        from_attributes = True
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
                "view_count": 0,
                "is_featured": True,
                "status": "published",
                "sort_order": 1,
                "published_at": "2024-06-23T10:00:00"
            }
        }


class NewsImage(BaseModel, TimestampMixin):
    """News image model."""
    
    news_id: UUID = Field(..., description="News ID")
    image_url: str = Field(..., min_length=1, max_length=500, description="Image URL")
    alt_text: Optional[str] = Field(None, max_length=255, description="Alternative text for accessibility")
    caption: Optional[str] = Field(None, description="Image caption")
    sort_order: int = Field(default=0, description="Image display order")
    image_type: ImageType = Field(default="content", description="Image type")
    
    @validator('image_url')
    def validate_image_url(cls, v):
        """Validate image URL format."""
        if not v.strip():
            raise ValueError("Image URL cannot be empty")
        # Basic URL validation
        if not (v.startswith('http://') or v.startswith('https://')):
            raise ValueError("Image URL must start with http:// or https://")
        return v.strip()
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "news_id": "550e8400-e29b-41d4-a716-446655440001",
                "image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
                "alt_text": "新型アクリルスタンドの製造風景",
                "caption": "最新設備での製造プロセス",
                "sort_order": 1,
                "image_type": "content"
            }
        }


class NewsTag(BaseModel, TimestampMixin):
    """News tag model."""
    
    news_id: UUID = Field(..., description="News ID")
    tag_name: str = Field(..., min_length=1, max_length=50, description="Tag name")
    
    @validator('tag_name')
    def validate_tag_name(cls, v):
        """Validate tag name."""
        if not v.strip():
            raise ValueError("Tag name cannot be empty")
        return v.strip()
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "news_id": "550e8400-e29b-41d4-a716-446655440001",
                "tag_name": "新商品"
            }
        }


class NewsView(BaseModel, TimestampMixin):
    """News view tracking model."""
    
    news_id: UUID = Field(..., description="News ID")
    ip_address: Optional[str] = Field(None, max_length=45, description="Client IP address (IPv6 compatible)")
    user_agent: Optional[str] = Field(None, description="Client user agent")
    viewed_at: datetime = Field(default_factory=datetime.now, description="View timestamp")
    
    @validator('ip_address')
    def validate_ip_address(cls, v):
        """Basic IP address validation."""
        if v is None:
            return v
        if not v.strip():
            return None
        return v.strip()
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "news_id": "550e8400-e29b-41d4-a716-446655440001",
                "ip_address": "192.168.1.1",
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "viewed_at": "2024-06-23T15:30:00"
            }
        }


# Update forward references
News.model_rebuild()