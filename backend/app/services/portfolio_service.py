"""
Portfolio business logic service.
"""
from typing import Dict, Any, List, Optional, Tuple
from uuid import UUID
from .base_service import BaseService
from ..repositories.portfolio_repository import PortfolioRepository
from ..schemas.portfolio_schemas import PortfolioFilterParams
import logging

logger = logging.getLogger(__name__)


class PortfolioService(BaseService):
    """Service for portfolio business logic."""
    
    def __init__(self, portfolio_repository: PortfolioRepository):
        super().__init__()
        self.portfolio_repository = portfolio_repository
        self.allowed_sort_fields = [
            "created_at", "updated_at", "title", "year", "quantity", "sort_order"
        ]
    
    async def get_portfolios(
        self, 
        filter_params: PortfolioFilterParams
    ) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        """Get portfolios with filtering and pagination."""
        try:
            # Validate pagination parameters
            self.validate_pagination_params(filter_params.page, filter_params.page_size)
            
            # Validate sort parameters
            self.validate_sort_params(filter_params.sort_by, self.allowed_sort_fields)
            
            # Get portfolios from repository
            portfolios, total_count = await self.portfolio_repository.get_portfolios_with_filters(
                category=filter_params.category,
                industry=filter_params.industry,
                year=filter_params.year,
                status=filter_params.status or "active",
                search=filter_params.search,
                page=filter_params.page,
                page_size=filter_params.page_size,
                sort_by=filter_params.sort_by or "created_at",
                sort_order=filter_params.sort_order or "desc"
            )
            
            # Calculate pagination metadata
            pagination_meta = self.calculate_pagination_meta(
                filter_params.page,
                filter_params.page_size,
                total_count
            )
            
            # Format response data
            formatted_portfolios = [self.format_response_data(portfolio) for portfolio in portfolios]
            
            return formatted_portfolios, pagination_meta
            
        except Exception as e:
            self.handle_service_error(e, "get_portfolios")
    
    async def get_portfolio_by_id(self, portfolio_id: UUID) -> Optional[Dict[str, Any]]:
        """Get portfolio by ID with all relations."""
        try:
            portfolio = await self.portfolio_repository.get_portfolio_with_relations(portfolio_id)
            
            if not portfolio:
                return None
            
            # Format response data
            return self.format_response_data(portfolio)
            
        except Exception as e:
            self.handle_service_error(e, f"get_portfolio_by_id({portfolio_id})")
    
    async def get_portfolio_stats(self) -> Dict[str, Any]:
        """Get portfolio statistics."""
        try:
            stats = await self.portfolio_repository.get_portfolio_stats()
            return self.format_response_data(stats)
            
        except Exception as e:
            self.handle_service_error(e, "get_portfolio_stats")
    
    async def get_category_filter_data(self) -> List[Dict[str, Any]]:
        """Get category data for filter UI."""
        try:
            categories = await self.portfolio_repository.get_category_filter_stats()
            return self.format_response_data(categories)
            
        except Exception as e:
            self.handle_service_error(e, "get_category_filter_data")
    
    async def create_portfolio(self, portfolio_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create new portfolio."""
        try:
            # Validate required fields
            required_fields = ["title", "category", "industry", "year", "quantity"]
            self.validate_required_fields(portfolio_data, required_fields)
            
            # Clean string fields
            string_fields = ["title", "description", "long_description"]
            cleaned_data = self.clean_string_fields(portfolio_data, string_fields)
            
            # Validate business rules
            self._validate_portfolio_business_rules(cleaned_data)
            
            # Create portfolio
            portfolio = await self.portfolio_repository.create(cleaned_data)
            
            return self.format_response_data(portfolio)
            
        except Exception as e:
            self.handle_service_error(e, "create_portfolio")
    
    async def update_portfolio(
        self, 
        portfolio_id: UUID, 
        update_data: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """Update existing portfolio."""
        try:
            # Check if portfolio exists
            existing_portfolio = await self.portfolio_repository.get_by_id(portfolio_id)
            if not existing_portfolio:
                return None
            
            # Clean string fields
            string_fields = ["title", "description", "long_description"]
            cleaned_data = self.clean_string_fields(update_data, string_fields)
            
            # Remove None values for partial updates
            cleaned_data = self.remove_none_values(cleaned_data)
            
            if not cleaned_data:
                # No data to update, return existing
                return self.format_response_data(existing_portfolio)
            
            # Validate business rules for the fields being updated
            self._validate_portfolio_business_rules(cleaned_data, is_update=True)
            
            # Update portfolio
            updated_portfolio = await self.portfolio_repository.update(portfolio_id, cleaned_data)
            
            return self.format_response_data(updated_portfolio)
            
        except Exception as e:
            self.handle_service_error(e, f"update_portfolio({portfolio_id})")
    
    async def delete_portfolio(self, portfolio_id: UUID) -> bool:
        """Delete portfolio (soft delete)."""
        try:
            # Check if portfolio exists
            existing_portfolio = await self.portfolio_repository.get_by_id(portfolio_id)
            if not existing_portfolio:
                return False
            
            # Soft delete
            deleted_portfolio = await self.portfolio_repository.soft_delete(portfolio_id)
            return deleted_portfolio is not None
            
        except Exception as e:
            self.handle_service_error(e, f"delete_portfolio({portfolio_id})")
    
    def _validate_portfolio_business_rules(
        self, 
        data: Dict[str, Any], 
        is_update: bool = False
    ) -> None:
        """Validate portfolio business rules."""
        # Validate category
        if "category" in data:
            valid_categories = ["original-badge", "standard-badge", "acrylic-stand", "acrylic-keychain"]
            if data["category"] not in valid_categories:
                raise ValueError(f"Invalid category. Must be one of: {', '.join(valid_categories)}")
        
        # Validate industry
        if "industry" in data:
            valid_industries = ["anime", "corporate", "event", "personal"]
            if data["industry"] not in valid_industries:
                raise ValueError(f"Invalid industry. Must be one of: {', '.join(valid_industries)}")
        
        # Validate year
        if "year" in data:
            from datetime import datetime
            current_year = datetime.now().year
            if data["year"] < 2000 or data["year"] > current_year + 1:
                raise ValueError(f"Year must be between 2000 and {current_year + 1}")
        
        # Validate quantity
        if "quantity" in data:
            if data["quantity"] <= 0:
                raise ValueError("Quantity must be greater than 0")
        
        # Validate status
        if "status" in data:
            valid_statuses = ["active", "draft", "archived"]
            if data["status"] not in valid_statuses:
                raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
        
        # Validate title length
        if "title" in data:
            if len(data["title"]) > 255:
                raise ValueError("Title cannot exceed 255 characters")
    
    def _format_portfolio_for_list(self, portfolio: Dict[str, Any]) -> Dict[str, Any]:
        """Format portfolio data for list view (exclude heavy fields)."""
        # Remove heavy fields for list view
        list_fields = [
            "id", "title", "category", "industry", "year", "quantity",
            "description", "status", "sort_order", "created_at", "updated_at"
        ]
        
        return {field: portfolio.get(field) for field in list_fields if field in portfolio}