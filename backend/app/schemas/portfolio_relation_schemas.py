"""
Portfolio relation schemas (images, tags, specifications).
"""
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, validator


class PortfolioImageResponse(BaseModel):
    """Portfolio image response schema."""
    
    id: UUID = Field(..., description="Image unique identifier")
    portfolio_id: UUID = Field(..., description="Portfolio ID")
    image_url: str = Field(..., description="Image URL")
    alt_text: Optional[str] = Field(None, description="Alternative text for accessibility")
    sort_order: int = Field(..., description="Image display order")
    is_thumbnail: bool = Field(..., description="Is this the thumbnail image")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }
        json_schema_extra = {
            "example": {
                "id": "650e8400-e29b-41d4-a716-446655440001",
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
                "alt_text": "星空物語キャラクター缶バッジ全種セット",
                "sort_order": 1,
                "is_thumbnail": True,
                "created_at": "2024-01-01T12:00:00Z",
                "updated_at": "2024-01-01T12:00:00Z"
            }
        }


class PortfolioImageCreate(BaseModel):
    """Portfolio image creation schema."""
    
    image_url: str = Field(..., min_length=1, max_length=500, description="Image URL")
    alt_text: Optional[str] = Field(None, max_length=255, description="Alternative text")
    sort_order: int = Field(default=0, description="Image display order")
    is_thumbnail: bool = Field(default=False, description="Is this the thumbnail image")
    
    @validator('image_url')
    def validate_image_url(cls, v):
        """Validate image URL format."""
        if not v.strip():
            raise ValueError("Image URL cannot be empty")
        if not (v.startswith('http://') or v.startswith('https://')):
            raise ValueError("Image URL must start with http:// or https://")
        return v.strip()


class PortfolioTagResponse(BaseModel):
    """Portfolio tag response schema."""
    
    id: UUID = Field(..., description="Tag unique identifier")
    portfolio_id: UUID = Field(..., description="Portfolio ID")
    tag_name: str = Field(..., description="Tag name")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }
        json_schema_extra = {
            "example": {
                "id": "750e8400-e29b-41d4-a716-446655440001",
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "tag_name": "特殊印刷",
                "created_at": "2024-01-01T12:00:00Z"
            }
        }


class PortfolioTagCreate(BaseModel):
    """Portfolio tag creation schema."""
    
    tag_name: str = Field(..., min_length=1, max_length=50, description="Tag name")
    
    @validator('tag_name')
    def validate_tag_name(cls, v):
        """Validate tag name."""
        if not v.strip():
            raise ValueError("Tag name cannot be empty")
        return v.strip()


class PortfolioSpecificationResponse(BaseModel):
    """Portfolio specification response schema."""
    
    id: UUID = Field(..., description="Specification unique identifier")
    portfolio_id: UUID = Field(..., description="Portfolio ID")
    size: Optional[str] = Field(None, description="Product size")
    material: Optional[str] = Field(None, description="Materials used")
    printing: Optional[str] = Field(None, description="Printing method")
    finishing: Optional[str] = Field(None, description="Finishing process")
    delivery_time: Optional[str] = Field(None, description="Delivery time")
    price: Optional[str] = Field(None, description="Reference price")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }
        json_schema_extra = {
            "example": {
                "id": "850e8400-e29b-41d4-a716-446655440001",
                "portfolio_id": "550e8400-e29b-41d4-a716-446655440001",
                "size": "直径57mm",
                "material": "ブリキ、透明樹脂フィルム",
                "printing": "4色フルカラー印刷 + 特殊グラデーション印刷",
                "finishing": "UVコーティング、安全ピン仕様",
                "delivery_time": "15営業日",
                "price": "1個あたり180円（税別）",
                "created_at": "2024-01-01T12:00:00Z",
                "updated_at": "2024-01-01T12:00:00Z"
            }
        }


class PortfolioSpecificationCreate(BaseModel):
    """Portfolio specification creation schema."""
    
    size: Optional[str] = Field(None, max_length=100, description="Product size")
    material: Optional[str] = Field(None, max_length=200, description="Materials used")
    printing: Optional[str] = Field(None, max_length=200, description="Printing method")
    finishing: Optional[str] = Field(None, max_length=200, description="Finishing process")
    delivery_time: Optional[str] = Field(None, max_length=50, description="Delivery time")
    price: Optional[str] = Field(None, max_length=100, description="Reference price")


class PortfolioSpecificationUpdate(BaseModel):
    """Portfolio specification update schema."""
    
    size: Optional[str] = Field(None, max_length=100, description="Product size")
    material: Optional[str] = Field(None, max_length=200, description="Materials used")
    printing: Optional[str] = Field(None, max_length=200, description="Printing method")
    finishing: Optional[str] = Field(None, max_length=200, description="Finishing process")
    delivery_time: Optional[str] = Field(None, max_length=50, description="Delivery time")
    price: Optional[str] = Field(None, max_length=100, description="Reference price")