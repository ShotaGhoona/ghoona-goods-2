"""
News API endpoints.
"""
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import JSONResponse

from app.dependencies import get_news_service
from app.services.news_service import NewsService
from app.schemas.news_schemas import (
    NewsResponse,
    NewsDetailResponse,
    NewsListItem,
    NewsFilterParams,
    NewsStatsResponse,
    CategoryStatsResponse,
    NewsViewRequest,
    NewsViewResponse,
    RelatedNewsResponse,
    AvailableYearsResponse,
    CategoryStats
)
from app.schemas.base_schemas import (
    SuccessResponse,
    ErrorResponse,
    PaginatedResponse
)

router = APIRouter()


@router.get(
    "/news",
    response_model=PaginatedResponse[NewsListItem],
    summary="Get news with filtering and pagination",
    description="Retrieve a list of published news articles with optional filtering by category, year, and search."
)
async def get_news_list(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(12, ge=1, le=100, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    year: int = Query(None, ge=2000, le=2100, description="Filter by year"),
    search: str = Query(None, min_length=1, max_length=100, description="Search term"),
    featured: bool = Query(None, description="Filter featured articles only"),
    sort_by: str = Query("published_at", description="Sort field"),
    sort_order: str = Query("desc", pattern="^(asc|desc)$", description="Sort order"),
    service: NewsService = Depends(get_news_service)
):
    """Get news list with filtering and pagination."""
    try:
        filter_params = NewsFilterParams(
            page=page,
            page_size=page_size,
            category=category,
            year=year,
            search=search,
            featured=featured,
            sort_by=sort_by,
            sort_order=sort_order
        )
        
        news_list, pagination_meta = await service.get_news_list(filter_params)
        
        return PaginatedResponse(
            success=True,
            message="ニュース一覧を取得しました",
            data=news_list,
            pagination=pagination_meta
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="ニュース一覧の取得に失敗しました")


@router.get(
    "/news/{news_id}",
    response_model=NewsDetailResponse,
    summary="Get news detail by ID",
    description="Retrieve detailed information about a specific news article including images and tags."
)
async def get_news_detail(
    news_id: UUID,
    service: NewsService = Depends(get_news_service)
):
    """Get news detail by ID."""
    try:
        news = await service.get_news_detail(news_id)
        
        if not news:
            raise HTTPException(status_code=404, detail="ニュースが見つかりませんでした")
        
        return NewsDetailResponse(**news)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="ニュース詳細の取得に失敗しました")


@router.post(
    "/news/{news_id}/view",
    response_model=NewsViewResponse,
    summary="Increment news view count",
    description="Record a view for the specified news article with duplicate prevention."
)
async def increment_news_view(
    news_id: UUID,
    request: Request,
    view_request: NewsViewRequest = None,
    service: NewsService = Depends(get_news_service)
):
    """Increment news view count."""
    try:
        # Get client information
        ip_address = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "")
        
        # Override with request data if provided
        if view_request and view_request.user_agent:
            user_agent = view_request.user_agent
        
        view_recorded, current_view_count, message = await service.increment_news_view(
            news_id=news_id,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return NewsViewResponse(
            success=True,
            message=message,
            updated=view_recorded,
            current_view_count=current_view_count
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="閲覧数の更新に失敗しました")


@router.get(
    "/news/{news_id}/related",
    response_model=RelatedNewsResponse,
    summary="Get related news articles",
    description="Get related news articles based on the same category."
)
async def get_related_news(
    news_id: UUID,
    limit: int = Query(3, ge=1, le=10, description="Number of related articles to return"),
    service: NewsService = Depends(get_news_service)
):
    """Get related news articles."""
    try:
        related_news = await service.get_related_news(news_id, limit)
        
        return RelatedNewsResponse(
            success=True,
            message="関連記事を取得しました",
            data=related_news
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="関連記事の取得に失敗しました")


@router.get(
    "/news/categories/stats",
    response_model=NewsStatsResponse,
    summary="Get news statistics by category",
    description="Get statistical information about news articles grouped by category."
)
async def get_category_statistics(
    service: NewsService = Depends(get_news_service)
):
    """Get news statistics by category."""
    try:
        category_stats = await service.get_category_statistics()
        
        # Calculate totals
        total_news = sum(stat.get("count", 0) for stat in category_stats)
        total_views = sum(stat.get("total_views", 0) for stat in category_stats)
        
        # Format response
        formatted_stats = [
            CategoryStats(
                category=stat["category"],
                count=stat.get("count", 0),
                total_views=stat.get("total_views", 0)
            )
            for stat in category_stats
        ]
        
        return NewsStatsResponse(
            total_news=total_news,
            total_views=total_views,
            category_stats=formatted_stats
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="統計情報の取得に失敗しました")


@router.get(
    "/news/categories/filters",
    response_model=CategoryStatsResponse,
    summary="Get category statistics for filters",
    description="Get category statistics formatted for frontend filter components."
)
async def get_category_stats_for_filters(
    service: NewsService = Depends(get_news_service)
):
    """Get category statistics for filters."""
    try:
        category_stats = await service.get_category_stats_for_filters()
        
        return CategoryStatsResponse(**category_stats)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="カテゴリ統計の取得に失敗しました")


@router.get(
    "/news/meta/years",
    response_model=AvailableYearsResponse,
    summary="Get available years",
    description="Get list of years that have published news articles."
)
async def get_available_years(
    service: NewsService = Depends(get_news_service)
):
    """Get available years from published news."""
    try:
        years = await service.get_available_years()
        
        return AvailableYearsResponse(
            success=True,
            message="利用可能な年度を取得しました",
            data=years
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="年度情報の取得に失敗しました")


# Health check endpoint for news service
@router.get(
    "/news/health",
    response_model=SuccessResponse,
    summary="News service health check",
    description="Check if the news service is working properly."
)
async def news_health_check(
    service: NewsService = Depends(get_news_service)
):
    """Health check for news service."""
    try:
        # Simple test to verify service is working
        years = await service.get_available_years()
        
        return SuccessResponse(
            success=True,
            message="News service is healthy"
        )
        
    except Exception as e:
        raise HTTPException(status_code=503, detail="News service is not available")


# Additional endpoint for getting featured news only
@router.get(
    "/news/featured",
    response_model=PaginatedResponse[NewsListItem],
    summary="Get featured news only",
    description="Retrieve only featured news articles."
)
async def get_featured_news(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(6, ge=1, le=50, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    service: NewsService = Depends(get_news_service)
):
    """Get featured news only."""
    try:
        filter_params = NewsFilterParams(
            page=page,
            page_size=page_size,
            category=category,
            featured=True,  # Only featured articles
            sort_by="published_at",
            sort_order="desc"
        )
        
        news_list, pagination_meta = await service.get_news_list(filter_params)
        
        return PaginatedResponse(
            success=True,
            message="注目記事を取得しました",
            data=news_list,
            pagination=pagination_meta
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="注目記事の取得に失敗しました")


# Endpoint for getting latest news (for homepage)
@router.get(
    "/news/latest",
    response_model=List[NewsListItem],
    summary="Get latest news for homepage",
    description="Get the latest news articles for display on homepage or widgets."
)
async def get_latest_news(
    limit: int = Query(6, ge=1, le=20, description="Number of articles to return"),
    category: str = Query(None, description="Filter by category"),
    service: NewsService = Depends(get_news_service)
):
    """Get latest news for homepage."""
    try:
        filter_params = NewsFilterParams(
            page=1,
            page_size=limit,
            category=category,
            sort_by="published_at",
            sort_order="desc"
        )
        
        news_list, _ = await service.get_news_list(filter_params)
        
        return news_list
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="最新ニュースの取得に失敗しました")