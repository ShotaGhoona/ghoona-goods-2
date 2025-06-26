"""
Base service class for business logic.
"""
from abc import ABC
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class BaseService(ABC):
    """Base service class with common business logic."""
    
    def __init__(self):
        """Initialize service."""
        pass
    
    def validate_required_fields(self, data: Dict[str, Any], required_fields: list) -> None:
        """Validate that required fields are present and not empty."""
        missing_fields = []
        empty_fields = []
        
        for field in required_fields:
            if field not in data:
                missing_fields.append(field)
            elif data[field] is None or (isinstance(data[field], str) and not data[field].strip()):
                empty_fields.append(field)
        
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
        
        if empty_fields:
            raise ValueError(f"Empty required fields: {', '.join(empty_fields)}")
    
    def clean_string_fields(self, data: Dict[str, Any], string_fields: list) -> Dict[str, Any]:
        """Clean string fields by stripping whitespace."""
        cleaned_data = data.copy()
        
        for field in string_fields:
            if field in cleaned_data and isinstance(cleaned_data[field], str):
                cleaned_data[field] = cleaned_data[field].strip()
        
        return cleaned_data
    
    def remove_none_values(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Remove keys with None values from dictionary."""
        return {k: v for k, v in data.items() if v is not None}
    
    def calculate_pagination_meta(
        self, 
        page: int, 
        page_size: int, 
        total_items: int
    ) -> Dict[str, Any]:
        """Calculate pagination metadata."""
        total_pages = (total_items + page_size - 1) // page_size if total_items > 0 else 0
        has_next = page < total_pages
        has_previous = page > 1
        
        return {
            "page": page,
            "page_size": page_size,
            "total_items": total_items,
            "total_pages": total_pages,
            "has_next": has_next,
            "has_previous": has_previous
        }
    
    def validate_pagination_params(self, page: int, page_size: int) -> None:
        """Validate pagination parameters."""
        if page < 1:
            raise ValueError("Page number must be greater than 0")
        
        if page_size < 1:
            raise ValueError("Page size must be greater than 0")
        
        if page_size > 100:
            raise ValueError("Page size cannot exceed 100")
    
    def validate_sort_params(self, sort_by: Optional[str], allowed_fields: list) -> None:
        """Validate sorting parameters."""
        if sort_by and sort_by not in allowed_fields:
            raise ValueError(f"Invalid sort field. Allowed fields: {', '.join(allowed_fields)}")
    
    def handle_service_error(self, error: Exception, operation: str) -> None:
        """Handle service errors with proper logging."""
        error_message = f"Error in {operation}: {str(error)}"
        logger.error(error_message)
        
        # Re-raise with context
        if isinstance(error, ValueError):
            raise error
        else:
            raise Exception(error_message)
    
    def format_response_data(self, data: Any) -> Any:
        """Format data for API response."""
        if isinstance(data, dict):
            # Convert datetime objects to ISO strings if needed
            formatted_data = {}
            for key, value in data.items():
                formatted_data[key] = self.format_response_data(value)
            return formatted_data
        
        elif isinstance(data, list):
            return [self.format_response_data(item) for item in data]
        
        else:
            # Handle datetime and UUID objects
            from datetime import datetime
            from uuid import UUID
            
            if isinstance(data, datetime):
                return data.isoformat()
            elif isinstance(data, UUID):
                return str(data)
            else:
                return data