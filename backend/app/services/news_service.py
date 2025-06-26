"""
News business logic service.
"""
from typing import Dict, Any, List, Optional, Tuple
from uuid import UUID
from .base_service import BaseService
from ..repositories.news_repository import NewsRepository
from ..schemas.news_schemas import NewsFilterParams
import logging

logger = logging.getLogger(__name__)


class NewsService(BaseService):
    """Service for news business logic."""
    
    def __init__(self, news_repository: NewsRepository):
        super().__init__()
        self.news_repository = news_repository
        self.allowed_sort_fields = [
            "published_at", "created_at", "updated_at", "title", "view_count", "sort_order"
        ]
    
    async def get_news_list(
        self, 
        filter_params: NewsFilterParams
    ) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        """Get news list with filtering and pagination."""
        try:
            # Validate pagination parameters
            self.validate_pagination_params(filter_params.page, filter_params.page_size)
            
            # Validate sort parameters
            self.validate_sort_params(filter_params.sort_by, self.allowed_sort_fields)
            
            # Get news from repository
            news_list, total_count = await self.news_repository.get_published_news(
                category=filter_params.category,
                year=filter_params.year,
                search=filter_params.search,
                featured_only=filter_params.featured or False,
                page=filter_params.page,
                page_size=filter_params.page_size,
                sort_by=filter_params.sort_by or "published_at",
                sort_order=filter_params.sort_order or "desc"
            )
            
            # Add tags to news items
            news_list = await self.news_repository.get_news_with_tags(news_list)
            
            # Calculate pagination metadata
            pagination_meta = self.calculate_pagination_meta(
                total_count, filter_params.page, filter_params.page_size
            )
            
            logger.info(f"Retrieved {len(news_list)} news articles (page {filter_params.page}/{pagination_meta['total_pages']})")
            
            return news_list, pagination_meta
            
        except Exception as e:
            logger.error(f"Error getting news list: {str(e)}")
            raise
    
    async def get_news_detail(self, news_id: UUID) -> Optional[Dict[str, Any]]:
        """Get news detail by ID."""
        try:
            news = await self.news_repository.get_news_by_id_with_relations(news_id)
            
            if not news:
                logger.warning(f"News not found: {news_id}")
                return None
            
            logger.info(f"Retrieved news detail: {news_id}")
            return news
            
        except Exception as e:
            logger.error(f"Error getting news detail {news_id}: {str(e)}")
            raise
    
    async def get_related_news(self, news_id: UUID, limit: int = 3) -> List[Dict[str, Any]]:
        """Get related news articles."""
        try:
            # First get the main news article to determine category
            main_news = await self.news_repository.get_news_by_id_with_relations(news_id)
            
            if not main_news:
                logger.warning(f"Main news not found for related articles: {news_id}")
                return []
            
            # Get related news by category
            related_news = await self.news_repository.get_related_news(
                news_id=news_id,
                category=main_news["category"],
                limit=limit
            )
            
            # Add tags to related news
            related_news = await self.news_repository.get_news_with_tags(related_news)
            
            logger.info(f"Retrieved {len(related_news)} related articles for {news_id}")
            return related_news
            
        except Exception as e:
            logger.error(f"Error getting related news for {news_id}: {str(e)}")
            raise
    
    async def increment_news_view(
        self, 
        news_id: UUID, 
        ip_address: str, 
        user_agent: str
    ) -> Tuple[bool, int, str]:
        """Increment news view count with duplicate prevention."""
        try:
            # Check if news exists first
            news = await self.news_repository.get_by_id(news_id)
            
            if not news:
                logger.warning(f"News not found for view increment: {news_id}")
                return False, 0, "記事が見つかりませんでした"
            
            # Increment view count
            view_recorded, current_view_count = await self.news_repository.increment_view_count(
                news_id=news_id,
                ip_address=ip_address,
                user_agent=user_agent
            )
            
            if view_recorded:
                message = "閲覧数を更新しました"
                logger.info(f"View count incremented for {news_id}, new count: {current_view_count}")
            else:
                message = "既に閲覧済みです"
                logger.info(f"Duplicate view detected for {news_id}")
            
            return view_recorded, current_view_count, message
            
        except Exception as e:
            logger.error(f"Error incrementing view for {news_id}: {str(e)}")
            raise
    
    async def get_category_statistics(self) -> List[Dict[str, Any]]:
        """Get news statistics by category."""
        try:
            stats = await self.news_repository.get_category_stats()
            
            logger.info(f"Retrieved category statistics for {len(stats)} categories")
            return stats
            
        except Exception as e:
            logger.error(f"Error getting category statistics: {str(e)}")
            raise
    
    async def get_available_years(self) -> List[int]:
        """Get available years from published news."""
        try:
            years = await self.news_repository.get_available_years()
            
            logger.info(f"Retrieved {len(years)} available years")
            return years
            
        except Exception as e:
            logger.error(f"Error getting available years: {str(e)}")
            raise
    
    async def get_category_stats_for_filters(self) -> Dict[str, Any]:
        """Get category statistics formatted for frontend filters."""
        try:
            # Get basic category stats
            category_stats = await self.news_repository.get_category_stats()
            
            # Calculate total count
            total_count = sum(stat.get("count", 0) for stat in category_stats)
            
            # Format for frontend
            categories = [
                {
                    "id": "all",
                    "name": "すべて", 
                    "count": total_count
                }
            ]
            
            # Add individual categories
            for stat in category_stats:
                categories.append({
                    "id": stat["category"],
                    "name": stat["category"],
                    "count": stat.get("count", 0)
                })
            
            return {"categories": categories}
            
        except Exception as e:
            logger.error(f"Error getting category stats for filters: {str(e)}")
            raise
    
    def validate_news_create_data(self, news_data: Dict[str, Any]) -> None:
        """Validate news creation data."""
        # Basic validation that's not covered by Pydantic
        if news_data.get("status") == "published" and not news_data.get("published_at"):
            # Auto-set published_at for published articles
            from datetime import datetime
            news_data["published_at"] = datetime.now().isoformat()
        
        # Validate featured image URL if provided
        featured_image_url = news_data.get("featured_image_url")
        if featured_image_url and not (featured_image_url.startswith("http://") or featured_image_url.startswith("https://")):
            raise ValueError("Featured image URL must be a valid HTTP/HTTPS URL")
        
        # Validate tags
        tags = news_data.get("tags", [])
        if len(tags) > 10:
            raise ValueError("Too many tags. Maximum 10 tags allowed.")
        
        # Validate images
        images = news_data.get("images", [])
        if len(images) > 20:
            raise ValueError("Too many images. Maximum 20 images allowed.")
    
    def validate_news_update_data(self, news_data: Dict[str, Any]) -> None:
        """Validate news update data."""
        # Similar validation for updates
        if news_data.get("status") == "published" and "published_at" not in news_data:
            # Don't auto-set published_at for updates unless explicitly provided
            pass
        
        # Validate featured image URL if provided
        featured_image_url = news_data.get("featured_image_url")
        if featured_image_url and not (featured_image_url.startswith("http://") or featured_image_url.startswith("https://")):
            raise ValueError("Featured image URL must be a valid HTTP/HTTPS URL")