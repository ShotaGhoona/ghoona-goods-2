"""
News repository for database operations.
"""
from typing import List, Optional, Dict, Any, Tuple
from uuid import UUID
from supabase import Client
from .base_repository import BaseRepository
import logging

logger = logging.getLogger(__name__)


class NewsRepository(BaseRepository):
    """Repository for news operations."""
    
    def __init__(self, supabase_client: Client):
        super().__init__(supabase_client, "news")
    
    async def get_published_news(
        self,
        category: Optional[str] = None,
        year: Optional[int] = None,
        search: Optional[str] = None,
        featured_only: bool = False,
        page: int = 1,
        page_size: int = 12,
        sort_by: str = "published_at",
        sort_order: str = "desc"
    ) -> Tuple[List[Dict[str, Any]], int]:
        """Get published news with filtering, pagination and search."""
        try:
            # Build base query for published news
            query = self._get_table().select("*")
            
            # Apply published status filter (always filter out deleted records)
            query = query.is_("deleted_at", "null")
            query = query.eq("status", "published")
            
            # Apply filters
            if category and category != "all":
                query = query.eq("category", category)
            if year:
                # Filter by year in published_at field
                start_date = f"{year}-01-01T00:00:00"
                end_date = f"{year}-12-31T23:59:59"
                query = query.gte("published_at", start_date).lte("published_at", end_date)
            if featured_only:
                query = query.eq("is_featured", True)
            
            # Apply search
            if search:
                # Search in title, excerpt, and content
                search_query = f"%{search}%"
                query = query.or_(f"title.ilike.{search_query},excerpt.ilike.{search_query},content.ilike.{search_query}")
            
            # Get total count for pagination
            count_query = query
            total_count = await self._execute_count_query(count_query)
            
            # Apply sorting
            if sort_order.lower() == "desc":
                query = query.order(sort_by, desc=True)
            else:
                query = query.order(sort_by, desc=False)
            
            # Order by featured first, then by the specified sort
            query = query.order("is_featured", desc=True)
            
            # Apply pagination
            offset = (page - 1) * page_size
            query = query.range(offset, offset + page_size - 1)
            
            # Execute query
            response = query.execute()
            
            return response.data, total_count
            
        except Exception as e:
            logger.error(f"Error getting published news: {str(e)}")
            raise
    
    async def get_news_by_id_with_relations(self, news_id: UUID) -> Optional[Dict[str, Any]]:
        """Get news by ID with images and tags."""
        try:
            # Get main news record
            news_response = self._get_table().select("*").eq("id", str(news_id)).eq("status", "published").is_("deleted_at", "null").execute()
            
            if not news_response.data:
                return None
            
            news = news_response.data[0]
            
            # Get images
            images_response = self.client.table("news_images").select("*").eq("news_id", str(news_id)).order("sort_order").execute()
            news["images"] = images_response.data
            
            # Get tags
            tags_response = self.client.table("news_tags").select("*").eq("news_id", str(news_id)).execute()
            news["tags"] = tags_response.data
            
            return news
            
        except Exception as e:
            logger.error(f"Error getting news by ID {news_id}: {str(e)}")
            raise
    
    async def get_related_news(self, news_id: UUID, category: str, limit: int = 3) -> List[Dict[str, Any]]:
        """Get related news articles by category."""
        try:
            query = self._get_table().select("id, title, category, excerpt, featured_image_url, featured_image_alt, author, read_time_minutes, view_count, is_featured, published_at")
            query = query.neq("id", str(news_id))
            query = query.eq("category", category)
            query = query.eq("status", "published")
            query = query.is_("deleted_at", "null")
            query = query.order("published_at", desc=True)
            query = query.limit(limit)
            
            response = query.execute()
            return response.data
            
        except Exception as e:
            logger.error(f"Error getting related news for {news_id}: {str(e)}")
            raise
    
    async def get_category_stats(self) -> List[Dict[str, Any]]:
        """Get statistics by category."""
        try:
            # Use Supabase RPC function for aggregation
            response = self.client.rpc(
                "get_news_category_stats"
            ).execute()
            
            return response.data
            
        except Exception as e:
            logger.error(f"Error getting category stats: {str(e)}")
            # Fallback to manual aggregation if RPC function doesn't exist
            try:
                query = self._get_table().select("category, view_count")
                query = query.eq("status", "published")
                query = query.is_("deleted_at", "null")
                
                response = query.execute()
                
                # Manual aggregation
                stats = {}
                for record in response.data:
                    category = record["category"]
                    if category not in stats:
                        stats[category] = {"category": category, "count": 0, "total_views": 0}
                    stats[category]["count"] += 1
                    stats[category]["total_views"] += record.get("view_count", 0)
                
                return list(stats.values())
                
            except Exception as fallback_e:
                logger.error(f"Error in fallback category stats: {str(fallback_e)}")
                raise
    
    async def increment_view_count(self, news_id: UUID, ip_address: str, user_agent: str) -> Tuple[bool, int]:
        """Increment view count with duplicate prevention."""
        try:
            # Use the stored function we created
            response = self.client.rpc(
                "increment_news_view_count",
                {
                    "target_news_id": str(news_id),
                    "client_ip": ip_address,
                    "client_user_agent": user_agent
                }
            ).execute()
            
            view_recorded = response.data if response.data is not None else False
            
            # Get updated view count
            news_response = self._get_table().select("view_count").eq("id", str(news_id)).execute()
            current_view_count = news_response.data[0]["view_count"] if news_response.data else 0
            
            return view_recorded, current_view_count
            
        except Exception as e:
            logger.error(f"Error incrementing view count for {news_id}: {str(e)}")
            # Fallback to simple increment without duplicate prevention
            try:
                # Simple increment
                update_response = self._get_table().update({"view_count": "view_count + 1"}).eq("id", str(news_id)).execute()
                
                # Get updated view count
                news_response = self._get_table().select("view_count").eq("id", str(news_id)).execute()
                current_view_count = news_response.data[0]["view_count"] if news_response.data else 0
                
                return True, current_view_count
                
            except Exception as fallback_e:
                logger.error(f"Error in fallback view increment: {str(fallback_e)}")
                raise
    
    async def get_available_years(self) -> List[int]:
        """Get available years from published news."""
        try:
            query = self._get_table().select("published_at")
            query = query.eq("status", "published")
            query = query.is_("deleted_at", "null")
            query = query.not_.is_("published_at", "null")
            
            response = query.execute()
            
            # Extract years from published_at dates
            years = set()
            for record in response.data:
                if record.get("published_at"):
                    # Extract year from ISO datetime string
                    year = int(record["published_at"][:4])
                    years.add(year)
            
            # Return sorted years in descending order
            return sorted(list(years), reverse=True)
            
        except Exception as e:
            logger.error(f"Error getting available years: {str(e)}")
            raise
    
    async def get_news_with_tags(self, news_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Add tags to news list items."""
        try:
            if not news_list:
                return news_list
            
            # Get all news IDs
            news_ids = [news["id"] for news in news_list]
            
            # Get tags for all news items in one query
            tags_response = self.client.table("news_tags").select("news_id, tag_name").in_("news_id", news_ids).execute()
            
            # Group tags by news_id
            tags_by_news = {}
            for tag in tags_response.data:
                news_id = tag["news_id"]
                if news_id not in tags_by_news:
                    tags_by_news[news_id] = []
                tags_by_news[news_id].append(tag["tag_name"])
            
            # Add tags to news items
            for news in news_list:
                news["tags"] = tags_by_news.get(news["id"], [])
            
            return news_list
            
        except Exception as e:
            logger.error(f"Error getting news with tags: {str(e)}")
            # Return news list without tags if there's an error
            for news in news_list:
                news["tags"] = []
            return news_list
    
    async def _execute_count_query(self, query) -> int:
        """Execute count query for pagination."""
        try:
            # Clone the query and execute count
            count_response = query.execute(count="exact")
            return count_response.count if hasattr(count_response, 'count') else len(count_response.data)
        except Exception as e:
            logger.warning(f"Error executing count query, falling back to data length: {str(e)}")
            # Fallback to executing the query and counting results
            response = query.execute()
            return len(response.data) if response.data else 0