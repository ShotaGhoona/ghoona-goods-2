"""
Base repository class with common database operations.
"""
from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any, Type, TypeVar
from uuid import UUID
from supabase import Client
import logging

logger = logging.getLogger(__name__)

T = TypeVar('T')


class BaseRepository(ABC):
    """Abstract base repository class."""
    
    def __init__(self, supabase_client: Client, table_name: str):
        """Initialize repository with Supabase client and table name."""
        self.client = supabase_client
        self.table_name = table_name
    
    def _get_table(self):
        """Get table reference."""
        return self.client.table(self.table_name)
    
    async def get_by_id(self, id: UUID) -> Optional[Dict[str, Any]]:
        """Get single record by ID."""
        try:
            result = self._get_table().select("*").eq("id", str(id)).execute()
            if result.data:
                return result.data[0]
            return None
        except Exception as e:
            logger.error(f"Error getting {self.table_name} by ID {id}: {e}")
            raise
    
    async def get_all(
        self, 
        filters: Optional[Dict[str, Any]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        order_by: Optional[str] = None,
        ascending: bool = True
    ) -> List[Dict[str, Any]]:
        """Get multiple records with optional filtering and pagination."""
        try:
            query = self._get_table().select("*")
            
            # Apply filters
            if filters:
                for key, value in filters.items():
                    if value is not None:
                        query = query.eq(key, value)
            
            # Apply ordering
            if order_by:
                query = query.order(order_by, desc=not ascending)
            
            # Apply pagination
            if limit:
                query = query.limit(limit)
            if offset:
                query = query.offset(offset)
            
            result = query.execute()
            return result.data or []
        except Exception as e:
            logger.error(f"Error getting {self.table_name} records: {e}")
            raise
    
    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create new record."""
        try:
            # Remove None values
            clean_data = {k: v for k, v in data.items() if v is not None}
            
            result = self._get_table().insert(clean_data).execute()
            if result.data:
                return result.data[0]
            raise Exception("Failed to create record")
        except Exception as e:
            logger.error(f"Error creating {self.table_name} record: {e}")
            raise
    
    async def update(self, id: UUID, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update existing record."""
        try:
            # Remove None values for partial updates
            clean_data = {k: v for k, v in data.items() if v is not None}
            
            if not clean_data:
                # No data to update
                return await self.get_by_id(id)
            
            result = self._get_table().update(clean_data).eq("id", str(id)).execute()
            if result.data:
                return result.data[0]
            return None
        except Exception as e:
            logger.error(f"Error updating {self.table_name} record {id}: {e}")
            raise
    
    async def delete(self, id: UUID) -> bool:
        """Delete record by ID."""
        try:
            result = self._get_table().delete().eq("id", str(id)).execute()
            return bool(result.data)
        except Exception as e:
            logger.error(f"Error deleting {self.table_name} record {id}: {e}")
            raise
    
    async def soft_delete(self, id: UUID) -> Optional[Dict[str, Any]]:
        """Soft delete record by setting deleted_at timestamp."""
        try:
            from datetime import datetime
            result = self._get_table().update({
                "deleted_at": datetime.now().isoformat()
            }).eq("id", str(id)).execute()
            
            if result.data:
                return result.data[0]
            return None
        except Exception as e:
            logger.error(f"Error soft deleting {self.table_name} record {id}: {e}")
            raise
    
    async def count(self, filters: Optional[Dict[str, Any]] = None) -> int:
        """Count records with optional filtering."""
        try:
            query = self._get_table().select("id", count="exact")
            
            # Apply filters
            if filters:
                for key, value in filters.items():
                    if value is not None:
                        query = query.eq(key, value)
            
            result = query.execute()
            return result.count or 0
        except Exception as e:
            logger.error(f"Error counting {self.table_name} records: {e}")
            raise
    
    async def exists(self, id: UUID) -> bool:
        """Check if record exists."""
        try:
            result = self._get_table().select("id").eq("id", str(id)).limit(1).execute()
            return bool(result.data)
        except Exception as e:
            logger.error(f"Error checking existence of {self.table_name} record {id}: {e}")
            raise
    
    def _build_search_query(self, query, search_term: str, search_fields: List[str]):
        """Build search query for text fields."""
        if not search_term or not search_fields:
            return query
        
        # Note: Supabase supports text search operators
        # This is a simple implementation, can be enhanced with full-text search
        search_conditions = []
        for field in search_fields:
            search_conditions.append(f"{field}.ilike.%{search_term}%")
        
        # Use 'or' operator for multiple field search
        if len(search_conditions) == 1:
            query = query.filter(search_conditions[0])
        else:
            # For multiple conditions, we need to use the 'or' operator
            or_condition = ",".join(search_conditions)
            query = query.filter(f"or({or_condition})")
        
        return query