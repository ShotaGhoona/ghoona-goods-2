"""
Portfolio-related API schemas.
"""
from datetime import datetime
from typing import Optional, List, Literal, Dict, Union
from uuid import UUID
from pydantic import BaseModel, Field, validator
from .base_schemas import FilterParams, PaginatedResponse


# Type definitions
CategoryType = Literal["original-badge", "standard-badge", "acrylic-stand", "acrylic-keychain"]
IndustryType = Literal["anime", "corporate", "event", "personal"]
StatusType = Literal["active", "draft", "archived"]


class PortfolioBase(BaseModel):
    """Base portfolio schema with common fields."""
    
    title: str = Field(..., min_length=1, max_length=255, description="Portfolio title")
    category: CategoryType = Field(..., description="Product category")
    industry: IndustryType = Field(..., description="Industry or usage type")
    year: int = Field(..., ge=2000, le=2100, description="Manufacturing year")
    quantity: int = Field(..., gt=0, description="Manufacturing quantity")
    description: Optional[str] = Field(None, description="Short description")
    long_description: Optional[str] = Field(None, description="Detailed description")
    status: StatusType = Field(default="active", description="Publication status")
    sort_order: int = Field(default=0, description="Display sort order")


class PortfolioCreate(PortfolioBase):
    """Schema for creating new portfolio."""
    
    @validator('title')
    def validate_title(cls, v):
        """Validate title is not empty after stripping."""
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip()
    
    class Config:
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


class PortfolioUpdate(BaseModel):
    """Schema for updating existing portfolio."""
    
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Portfolio title")
    category: Optional[CategoryType] = Field(None, description="Product category")
    industry: Optional[IndustryType] = Field(None, description="Industry or usage type")
    year: Optional[int] = Field(None, ge=2000, le=2100, description="Manufacturing year")
    quantity: Optional[int] = Field(None, gt=0, description="Manufacturing quantity")
    description: Optional[str] = Field(None, description="Short description")
    long_description: Optional[str] = Field(None, description="Detailed description")
    status: Optional[StatusType] = Field(None, description="Publication status")
    sort_order: Optional[int] = Field(None, description="Display sort order")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate title is not empty after stripping."""
        if v is not None and not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip() if v else v


class PortfolioResponse(PortfolioBase):
    """Schema for portfolio response."""
    
    id: UUID = Field(..., description="Portfolio unique identifier")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }


class PortfolioDetailResponse(PortfolioResponse):
    """Schema for detailed portfolio response with relations."""
    
    images: List[Dict] = Field(default_factory=list, description="Portfolio images")
    tags: List[Dict] = Field(default_factory=list, description="Portfolio tags") 
    specifications: Optional[Dict] = Field(None, description="Portfolio specifications")


class PortfolioListResponse(PaginatedResponse[PortfolioResponse]):
    """Schema for paginated portfolio list response."""
    pass


class PortfolioFilterParams(FilterParams):
    """Portfolio-specific filter parameters."""
    
    category: Optional[CategoryType] = Field(None, description="Filter by category")
    industry: Optional[IndustryType] = Field(None, description="Filter by industry")
    year: Optional[int] = Field(None, ge=2000, le=2100, description="Filter by year")
    status: Optional[StatusType] = Field(None, description="Filter by status")
    search: Optional[str] = Field(None, min_length=1, max_length=100, description="Search in title and description")
    
    class Config:
        json_schema_extra = {
            "example": {
                "page": 1,
                "page_size": 20,
                "category": "original-badge",
                "industry": "anime",
                "year": 2024,
                "status": "active",
                "search": "アニメ",
                "sort_by": "created_at",
                "sort_order": "desc"
            }
        }


class CategoryStats(BaseModel):
    """Category statistics schema."""
    
    category: CategoryType = Field(..., description="Product category")
    count: int = Field(..., ge=0, description="Number of portfolios in this category")
    total_quantity: int = Field(..., ge=0, description="Total manufactured quantity")
    
    class Config:
        json_schema_extra = {
            "example": {
                "category": "original-badge",
                "count": 15,
                "total_quantity": 25000
            }
        }


class IndustryStats(BaseModel):
    """Industry statistics schema."""
    
    industry: IndustryType = Field(..., description="Industry type")
    count: int = Field(..., ge=0, description="Number of portfolios in this industry")
    total_quantity: int = Field(..., ge=0, description="Total manufactured quantity")


class YearStats(BaseModel):
    """Year statistics schema."""
    
    year: int = Field(..., description="Manufacturing year")
    count: int = Field(..., ge=0, description="Number of portfolios in this year")
    total_quantity: int = Field(..., ge=0, description="Total manufactured quantity")


class PortfolioStatsResponse(BaseModel):
    """Portfolio statistics response schema."""
    
    total_portfolios: int = Field(..., ge=0, description="Total number of portfolios")
    total_quantity: int = Field(..., ge=0, description="Total manufactured quantity")
    category_stats: List[CategoryStats] = Field(default_factory=list, description="Statistics by category")
    industry_stats: List[IndustryStats] = Field(default_factory=list, description="Statistics by industry")
    year_stats: List[YearStats] = Field(default_factory=list, description="Statistics by year")
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_portfolios": 50,
                "total_quantity": 150000,
                "category_stats": [
                    {"category": "original-badge", "count": 15, "total_quantity": 25000},
                    {"category": "standard-badge", "count": 20, "total_quantity": 60000}
                ],
                "industry_stats": [
                    {"industry": "anime", "count": 25, "total_quantity": 80000},
                    {"industry": "corporate", "count": 15, "total_quantity": 35000}
                ],
                "year_stats": [
                    {"year": 2024, "count": 20, "total_quantity": 75000},
                    {"year": 2023, "count": 18, "total_quantity": 50000}
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
                    {"id": "all", "name": "すべて", "icon": "🎨", "count": 156},
                    {"id": "original-badge", "name": "オリジナル缶バッジ", "icon": "🎨", "count": 48},
                    {"id": "standard-badge", "name": "通常缶バッジ", "icon": "⭐", "count": 62}
                ]
            }
        }