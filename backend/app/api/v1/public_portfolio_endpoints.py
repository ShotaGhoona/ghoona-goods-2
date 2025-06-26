"""
Public Portfolio API endpoints (no authentication required).
"""
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse

from app.dependencies import get_portfolio_service
from app.services.portfolio_service import PortfolioService
from app.schemas.portfolio_schemas import (
    PortfolioResponse,
    PortfolioDetailResponse,
    PortfolioFilterParams,
    PortfolioStatsResponse,
    CategoryStatsResponse
)
from app.schemas.base_schemas import (
    SuccessResponse,
    ErrorResponse,
    PaginatedResponse
)

router = APIRouter()


@router.get(
    "/public/portfolios",
    response_model=PaginatedResponse[PortfolioResponse],
    summary="Get public portfolios",
    description="Retrieve a list of active portfolios for public display. No authentication required."
)
async def get_public_portfolios(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    industry: str = Query(None, description="Filter by industry"),
    year: int = Query(None, ge=2000, le=2100, description="Filter by year"),
    search: str = Query(None, min_length=1, max_length=100, description="Search term"),
    sort_by: str = Query("created_at", description="Sort field"),
    sort_order: str = Query("desc", pattern="^(asc|desc)$", description="Sort order"),
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get public portfolios with filtering and pagination."""
    try:
        filter_params = PortfolioFilterParams(
            page=page,
            page_size=page_size,
            category=category,
            industry=industry,
            year=year,
            status="active",  # Force to active for public endpoints
            search=search,
            sort_by=sort_by,
            sort_order=sort_order
        )
        
        portfolios, pagination_meta = await service.get_portfolios(filter_params)
        
        return {
            "success": True,
            "message": "Portfolios retrieved successfully",
            "data": portfolios,
            "pagination": pagination_meta
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/public/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Get public portfolio by ID",
    description="Retrieve a specific active portfolio with all related data. No authentication required."
)
async def get_public_portfolio(
    portfolio_id: UUID,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get public portfolio by ID with all relations."""
    try:
        portfolio = await service.get_portfolio_by_id(portfolio_id)
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        # Check if portfolio is active (only show active portfolios publicly)
        if portfolio.get("status") != "active":
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return {
            "success": True,
            "message": "Portfolio retrieved successfully",
            "data": portfolio
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/public/portfolios/stats/overview",
    response_model=SuccessResponse,
    summary="Get public portfolio statistics",
    description="Get basic statistics about active portfolios. No authentication required."
)
async def get_public_portfolio_stats(
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get public portfolio statistics."""
    try:
        stats = await service.get_portfolio_stats()
        
        return {
            "success": True,
            "message": "Portfolio statistics retrieved successfully",
            "data": stats
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/public/portfolios/stats/categories",
    response_model=SuccessResponse,
    summary="Get public category filter statistics",
    description="Get category statistics for public filter UI. No authentication required."
)
async def get_public_category_filter_stats(
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get public category statistics for filters."""
    try:
        categories = await service.get_category_filter_data()
        
        return {
            "success": True,
            "message": "Category statistics retrieved successfully",
            "data": {"categories": categories}
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")