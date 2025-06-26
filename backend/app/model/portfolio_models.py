"""
Portfolio-related database models.
"""
from datetime import datetime
from typing import Optional, List, Literal
from uuid import UUID
from pydantic import Field, validator
from .base import BaseModel, TimestampMixin, SoftDeleteMixin


# Type definitions for enums
CategoryType = Literal["original-badge", "standard-badge", "acrylic-stand", "acrylic-keychain"]
IndustryType = Literal["anime", "corporate", "event", "personal"]
StatusType = Literal["active", "draft", "archived"]


class Portfolio(BaseModel, TimestampMixin, SoftDeleteMixin):
    """Portfolio main model."""
    
    title: str = Field(..., min_length=1, max_length=255, description="Portfolio title")
    category: CategoryType = Field(..., description="Product category")
    industry: IndustryType = Field(..., description="Industry or usage type")
    year: int = Field(..., ge=2000, le=2100, description="Manufacturing year")
    quantity: int = Field(..., gt=0, description="Manufacturing quantity")
    description: Optional[str] = Field(None, description="Short description")
    long_description: Optional[str] = Field(None, description="Detailed description")
    status: StatusType = Field(default="active", description="Publication status")
    sort_order: int = Field(default=0, description="Display sort order")
    
    # Relations (populated by queries)
    images: Optional[List["PortfolioImage"]] = Field(default=None, description="Portfolio images")
    tags: Optional[List["PortfolioTag"]] = Field(default=None, description="Portfolio tags")
    specifications: Optional["PortfolioSpecification"] = Field(default=None, description="Portfolio specifications")
    
    @validator('year')
    def validate_year(cls, v):
        """Validate manufacturing year."""
        current_year = datetime.now().year
        if v > current_year + 1:
            raise ValueError(f"Year cannot be more than {current_year + 1}")
        return v
    
    @validator('title')
    def validate_title(cls, v):
        """Validate title is not empty after stripping."""
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip()
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "title": "アニメ「星空物語」公式缶バッジセット",
                "category": "original-badge",
                "industry": "anime",
                "year": 2024,
                "quantity": 5000,
                "description": "人気アニメの主要キャラクター6種類の缶バッジセット",
                "long_description": "TVアニメ「星空物語」の人気キャラクター6体をデザインした公式缶バッジセットです。",
                "status": "active",
                "sort_order": 1
            }
        }


class PortfolioImage(BaseModel, TimestampMixin):
    """Portfolio image model."""
    
    portfolio_id: UUID = Field(..., description="Portfolio ID")
    image_url: str = Field(..., min_length=1, max_length=500, description="Image URL")
    alt_text: Optional[str] = Field(None, max_length=255, description="Alternative text for accessibility")
    sort_order: int = Field(default=0, description="Image display order")
    is_thumbnail: bool = Field(default=False, description="Is this the thumbnail image")
    
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
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
                "alt_text": "星空物語キャラクター缶バッジ全種セット",
                "sort_order": 1,
                "is_thumbnail": True
            }
        }


class PortfolioTag(BaseModel, TimestampMixin):
    """Portfolio tag model."""
    
    portfolio_id: UUID = Field(..., description="Portfolio ID")
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
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "tag_name": "特殊印刷"
            }
        }


class PortfolioSpecification(BaseModel, TimestampMixin):
    """Portfolio specification model."""
    
    portfolio_id: UUID = Field(..., description="Portfolio ID")
    size: Optional[str] = Field(None, max_length=100, description="Product size")
    material: Optional[str] = Field(None, max_length=200, description="Materials used")
    printing: Optional[str] = Field(None, max_length=200, description="Printing method")
    finishing: Optional[str] = Field(None, max_length=200, description="Finishing process")
    delivery_time: Optional[str] = Field(None, max_length=50, description="Delivery time")
    price: Optional[str] = Field(None, max_length=100, description="Reference price")
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "size": "直径57mm",
                "material": "ブリキ、透明樹脂フィルム",
                "printing": "4色フルカラー印刷 + 特殊グラデーション印刷",
                "finishing": "UVコーティング、安全ピン仕様",
                "delivery_time": "15営業日",
                "price": "1個あたり180円（税別）"
            }
        }


# Update forward references
Portfolio.model_rebuild()