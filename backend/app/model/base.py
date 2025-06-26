"""
Base model classes and utilities.
"""
from datetime import datetime
from typing import Optional, Dict, Any
from uuid import UUID
from pydantic import BaseModel as PydanticBaseModel, Field


class BaseModel(PydanticBaseModel):
    """Base model with common fields and utilities."""
    
    id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat() if dt else None,
            UUID: lambda uuid: str(uuid) if uuid else None
        }
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert model to dictionary."""
        return self.model_dump(exclude_none=True)
    
    def to_dict_with_relations(self, include_relations: bool = True) -> Dict[str, Any]:
        """Convert model to dictionary with optional relations."""
        data = self.to_dict()
        if not include_relations:
            # Remove relation fields if needed
            relation_fields = ['images', 'tags', 'specifications']
            for field in relation_fields:
                data.pop(field, None)
        return data


class TimestampMixin(PydanticBaseModel):
    """Mixin for timestamp fields."""
    
    created_at: Optional[datetime] = Field(default=None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(default=None, description="Last update timestamp")
    
    class Config:
        from_attributes = True


class SoftDeleteMixin(PydanticBaseModel):
    """Mixin for soft delete functionality."""
    
    deleted_at: Optional[datetime] = Field(default=None, description="Deletion timestamp")
    
    class Config:
        from_attributes = True
    
    @property
    def is_deleted(self) -> bool:
        """Check if record is soft deleted."""
        return self.deleted_at is not None