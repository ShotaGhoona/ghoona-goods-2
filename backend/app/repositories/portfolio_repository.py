"""
Portfolio repository for database operations.
"""
from typing import List, Optional, Dict, Any, Tuple
from uuid import UUID
from supabase import Client
from .base_repository import BaseRepository
import logging

logger = logging.getLogger(__name__)


class PortfolioRepository(BaseRepository):
    """Repository for portfolio operations."""
    
    def __init__(self, supabase_client: Client):
        super().__init__(supabase_client, "portfolios")
    
    async def get_portfolios_with_filters(
        self,
        category: Optional[str] = None,
        industry: Optional[str] = None,
        year: Optional[int] = None,
        status: str = "active",
        search: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Tuple[List[Dict[str, Any]], int]:
        """Get portfolios with filtering, pagination and search."""
        try:
            # Build base query
            query = self._get_table().select("*")
            
            # Apply status filter (always filter out deleted records)
            query = query.is_("deleted_at", "null")
            
            # Apply filters
            if status:
                query = query.eq("status", status)
            if category and category != "all":
                query = query.eq("category", category)
            if industry and industry != "all":
                query = query.eq("industry", industry)
            if year:
                query = query.eq("year", year)
            
            # Apply search
            if search:
                # Search in title and description
                search_pattern = f"%{search}%"
                query = query.or_(f"title.ilike.%{search}%,description.ilike.%{search}%")
            
            # Apply sorting
            ascending = sort_order.lower() == "asc"
            query = query.order(sort_by, desc=not ascending)
            
            # Apply pagination
            offset = (page - 1) * page_size
            query = query.limit(page_size).offset(offset)
            
            # Execute query
            result = query.execute()
            
            # For now, return count as length of data (this is a simplified approach)
            # In production, you'd want a separate count query
            total_count = len(result.data) if result.data else 0
            
            return result.data or [], total_count
            
        except Exception as e:
            logger.error(f"Error getting portfolios with filters: {e}")
            raise
    
    async def get_portfolio_with_relations(self, portfolio_id: UUID) -> Optional[Dict[str, Any]]:
        """Get portfolio with all related data (images, tags, specifications)."""
        try:
            # Get portfolio
            portfolio = await self.get_by_id(portfolio_id)
            if not portfolio:
                return None
            
            # Check if not deleted
            if portfolio.get("deleted_at"):
                return None
            
            # Get related data
            portfolio_id_str = str(portfolio_id)
            
            # Get images
            images_result = self.client.table("portfolio_images").select("*").eq("portfolio_id", portfolio_id_str).order("sort_order").execute()
            portfolio["images"] = images_result.data or []
            
            # Get tags
            tags_result = self.client.table("portfolio_tags").select("*").eq("portfolio_id", portfolio_id_str).execute()
            portfolio["tags"] = tags_result.data or []
            
            # Get specifications
            specs_result = self.client.table("portfolio_specifications").select("*").eq("portfolio_id", portfolio_id_str).execute()
            portfolio["specifications"] = specs_result.data[0] if specs_result.data else None
            
            return portfolio
            
        except Exception as e:
            logger.error(f"Error getting portfolio {portfolio_id} with relations: {e}")
            raise
    
    async def get_portfolio_stats(self) -> Dict[str, Any]:
        """Get portfolio statistics."""
        try:
            # Get active portfolios only
            portfolios_result = self.client.table("portfolios").select("category,industry,year,quantity").eq("status", "active").is_("deleted_at", "null").execute()
            
            portfolios = portfolios_result.data or []
            
            if not portfolios:
                return {
                    "total_portfolios": 0,
                    "total_quantity": 0,
                    "category_stats": [],
                    "industry_stats": [],
                    "year_stats": []
                }
            
            # Calculate statistics
            total_portfolios = len(portfolios)
            total_quantity = sum(p.get("quantity", 0) for p in portfolios)
            
            # Category stats
            category_stats = {}
            for portfolio in portfolios:
                category = portfolio.get("category")
                if category:
                    if category not in category_stats:
                        category_stats[category] = {"count": 0, "total_quantity": 0}
                    category_stats[category]["count"] += 1
                    category_stats[category]["total_quantity"] += portfolio.get("quantity", 0)
            
            category_stats_list = [
                {"category": cat, "count": stats["count"], "total_quantity": stats["total_quantity"]}
                for cat, stats in category_stats.items()
            ]
            
            # Industry stats
            industry_stats = {}
            for portfolio in portfolios:
                industry = portfolio.get("industry")
                if industry:
                    if industry not in industry_stats:
                        industry_stats[industry] = {"count": 0, "total_quantity": 0}
                    industry_stats[industry]["count"] += 1
                    industry_stats[industry]["total_quantity"] += portfolio.get("quantity", 0)
            
            industry_stats_list = [
                {"industry": ind, "count": stats["count"], "total_quantity": stats["total_quantity"]}
                for ind, stats in industry_stats.items()
            ]
            
            # Year stats
            year_stats = {}
            for portfolio in portfolios:
                year = portfolio.get("year")
                if year:
                    if year not in year_stats:
                        year_stats[year] = {"count": 0, "total_quantity": 0}
                    year_stats[year]["count"] += 1
                    year_stats[year]["total_quantity"] += portfolio.get("quantity", 0)
            
            year_stats_list = [
                {"year": year, "count": stats["count"], "total_quantity": stats["total_quantity"]}
                for year, stats in sorted(year_stats.items(), reverse=True)
            ]
            
            return {
                "total_portfolios": total_portfolios,
                "total_quantity": total_quantity,
                "category_stats": category_stats_list,
                "industry_stats": industry_stats_list,
                "year_stats": year_stats_list
            }
            
        except Exception as e:
            logger.error(f"Error getting portfolio stats: {e}")
            raise
    
    async def get_category_filter_stats(self) -> List[Dict[str, Any]]:
        """Get category statistics for filter UI."""
        try:
            # Get active portfolios count by category
            portfolios_result = self.client.table("portfolios").select("category").eq("status", "active").is_("deleted_at", "null").execute()
            
            portfolios = portfolios_result.data or []
            
            # Count by category
            category_counts = {}
            total_count = len(portfolios)
            
            for portfolio in portfolios:
                category = portfolio.get("category")
                if category:
                    category_counts[category] = category_counts.get(category, 0) + 1
            
            # Category mapping with icons
            category_info = {
                "original-badge": {"name": "オリジナル缶バッジ", "icon": "🎨"},
                "standard-badge": {"name": "通常缶バッジ", "icon": "⭐"},
                "acrylic-stand": {"name": "アクリルスタンド", "icon": "🏢"},
                "acrylic-keychain": {"name": "アクリルキーホルダー", "icon": "🔑"}
            }
            
            # Build response
            categories = [
                {
                    "id": "all",
                    "name": "すべて",
                    "icon": "🎨",
                    "count": total_count
                }
            ]
            
            for category_id, info in category_info.items():
                count = category_counts.get(category_id, 0)
                categories.append({
                    "id": category_id,
                    "name": info["name"],
                    "icon": info["icon"],
                    "count": count
                })
            
            return categories
            
        except Exception as e:
            logger.error(f"Error getting category filter stats: {e}")
            raise
    
    async def create_portfolio_with_relations(
        self,
        portfolio_data: Dict[str, Any],
        images_data: Optional[List[Dict[str, Any]]] = None,
        tags_data: Optional[List[Dict[str, Any]]] = None,
        specifications_data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Create portfolio with related data."""
        try:
            # Create portfolio
            portfolio = await self.create(portfolio_data)
            portfolio_id = portfolio["id"]
            
            # Create images
            if images_data:
                for img_data in images_data:
                    img_data["portfolio_id"] = portfolio_id
                    self.client.table("portfolio_images").insert(img_data).execute()
            
            # Create tags
            if tags_data:
                for tag_data in tags_data:
                    tag_data["portfolio_id"] = portfolio_id
                    self.client.table("portfolio_tags").insert(tag_data).execute()
            
            # Create specifications
            if specifications_data:
                specifications_data["portfolio_id"] = portfolio_id
                self.client.table("portfolio_specifications").insert(specifications_data).execute()
            
            # Return portfolio with relations
            return await self.get_portfolio_with_relations(UUID(portfolio_id))
            
        except Exception as e:
            logger.error(f"Error creating portfolio with relations: {e}")
            raise