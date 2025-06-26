"""
Base API schemas for common response patterns.
"""
from datetime import datetime
from typing import Generic, TypeVar, Optional, List, Any, Dict
from uuid import UUID
from pydantic import BaseModel, Field


T = TypeVar('T')


class BaseResponse(BaseModel):
    """Base response schema."""
    
    success: bool = Field(default=True, description="Operation success status")
    message: Optional[str] = Field(default=None, description="Response message")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")
    
    class Config:
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda uuid: str(uuid)
        }


class SuccessResponse(BaseResponse):
    """Success response schema."""
    
    data: Optional[Any] = Field(default=None, description="Response data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Operation completed successfully",
                "data": {"id": "123e4567-e89b-12d3-a456-426614174000"},
                "timestamp": "2024-01-01T12:00:00Z"
            }
        }


class ErrorResponse(BaseResponse):
    """Error response schema."""
    
    success: bool = Field(default=False)
    error_code: Optional[str] = Field(default=None, description="Error code")
    error_details: Optional[Dict[str, Any]] = Field(default=None, description="Detailed error information")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": False,
                "message": "Validation error occurred",
                "error_code": "VALIDATION_ERROR",
                "error_details": {"field": "title", "issue": "Field is required"},
                "timestamp": "2024-01-01T12:00:00Z"
            }
        }


class PaginationMeta(BaseModel):
    """Pagination metadata schema."""
    
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, le=100, description="Items per page")
    total_items: int = Field(..., ge=0, description="Total number of items")
    total_pages: int = Field(..., ge=0, description="Total number of pages")
    has_next: bool = Field(..., description="Has next page")
    has_previous: bool = Field(..., description="Has previous page")
    
    class Config:
        json_schema_extra = {
            "example": {
                "page": 1,
                "page_size": 20,
                "total_items": 150,
                "total_pages": 8,
                "has_next": True,
                "has_previous": False
            }
        }


class PaginatedResponse(BaseResponse, Generic[T]):
    """Paginated response schema."""
    
    data: List[T] = Field(default_factory=list, description="Paginated data items")
    pagination: PaginationMeta = Field(..., description="Pagination metadata")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Data retrieved successfully",
                "data": [
                    {"id": "123e4567-e89b-12d3-a456-426614174000", "title": "Sample Portfolio"},
                    {"id": "123e4567-e89b-12d3-a456-426614174001", "title": "Another Portfolio"}
                ],
                "pagination": {
                    "page": 1,
                    "page_size": 20,
                    "total_items": 150,
                    "total_pages": 8,
                    "has_next": True,
                    "has_previous": False
                },
                "timestamp": "2024-01-01T12:00:00Z"
            }
        }


class FilterParams(BaseModel):
    """Base filter parameters."""
    
    page: int = Field(default=1, ge=1, description="Page number")
    page_size: int = Field(default=20, ge=1, le=100, description="Items per page")
    sort_by: Optional[str] = Field(default=None, description="Sort field")
    sort_order: Optional[str] = Field(default="asc", pattern="^(asc|desc)$", description="Sort order")
    
    class Config:
        json_schema_extra = {
            "example": {
                "page": 1,
                "page_size": 20,
                "sort_by": "created_at",
                "sort_order": "desc"
            }
        }


class HealthCheckResponse(BaseModel):
    """Health check response schema."""
    
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
    timestamp: datetime = Field(default_factory=datetime.now, description="Check timestamp")
    database_status: str = Field(..., description="Database connection status")
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "version": "1.0.0",
                "timestamp": "2024-01-01T12:00:00Z",
                "database_status": "connected"
            }
        }