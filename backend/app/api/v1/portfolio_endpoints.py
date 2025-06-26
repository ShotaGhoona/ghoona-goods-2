"""
Portfolio API endpoints.
"""
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse

from app.dependencies import get_portfolio_service, get_admin_portfolio_service
from app.services.portfolio_service import PortfolioService
from app.schemas.portfolio_schemas import (
    PortfolioResponse,
    PortfolioDetailResponse,
    PortfolioCreate,
    PortfolioUpdate,
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
    "/portfolios",
    response_model=PaginatedResponse[PortfolioResponse],
    summary="Get portfolios with filtering and pagination",
    description="Retrieve a list of portfolios with optional filtering by category, industry, year, and search."
)
async def get_portfolios(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    industry: str = Query(None, description="Filter by industry"),
    year: int = Query(None, ge=2000, le=2100, description="Filter by year"),
    status: str = Query("active", description="Filter by status"),
    search: str = Query(None, min_length=1, max_length=100, description="Search term"),
    sort_by: str = Query("created_at", description="Sort field"),
    sort_order: str = Query("desc", pattern="^(asc|desc)$", description="Sort order"),
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get portfolios with filtering and pagination."""
    try:
        filter_params = PortfolioFilterParams(
            page=page,
            page_size=page_size,
            category=category,
            industry=industry,
            year=year,
            status=status,
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
    "/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Get portfolio by ID",
    description="Retrieve a specific portfolio with all related data (images, tags, specifications)."
)
async def get_portfolio(
    portfolio_id: UUID,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get portfolio by ID with all relations."""
    try:
        portfolio = await service.get_portfolio_by_id(portfolio_id)
        
        if not portfolio:
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
    "/portfolios/stats/overview",
    response_model=SuccessResponse,
    summary="Get portfolio statistics",
    description="Get comprehensive statistics about portfolios including counts by category, industry, and year."
)
async def get_portfolio_stats(
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get portfolio statistics."""
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
    "/portfolios/stats/categories",
    response_model=SuccessResponse,
    summary="Get category filter statistics",
    description="Get category statistics for filter UI components."
)
async def get_category_filter_stats(
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Get category statistics for filters."""
    try:
        categories = await service.get_category_filter_data()
        
        return {
            "success": True,
            "message": "Category statistics retrieved successfully",
            "data": {"categories": categories}
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post(
    "/portfolios",
    response_model=SuccessResponse,
    status_code=201,
    summary="Create new portfolio",
    description="Create a new portfolio record. Admin access required."
)
async def create_portfolio(
    portfolio_data: PortfolioCreate,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Create new portfolio."""
    try:
        portfolio = await service.create_portfolio(portfolio_data.model_dump())
        
        return {
            "success": True,
            "message": "Portfolio created successfully",
            "data": portfolio
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.put(
    "/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Update portfolio",
    description="Update an existing portfolio. Admin access required."
)
async def update_portfolio(
    portfolio_id: UUID,
    portfolio_data: PortfolioUpdate,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Update existing portfolio."""
    try:
        # Only include non-None values for partial updates
        update_data = portfolio_data.model_dump(exclude_none=True)
        
        portfolio = await service.update_portfolio(portfolio_id, update_data)
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return {
            "success": True,
            "message": "Portfolio updated successfully",
            "data": portfolio
        }
        
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.delete(
    "/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Delete portfolio",
    description="Soft delete a portfolio. Admin access required."
)
async def delete_portfolio(
    portfolio_id: UUID,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Delete portfolio (soft delete)."""
    try:
        success = await service.delete_portfolio(portfolio_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return {
            "success": True,
            "message": "Portfolio deleted successfully",
            "data": {"id": str(portfolio_id)}
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/health",
    response_model=SuccessResponse,
    summary="Portfolio service health check",
    description="Check if the portfolio service is working correctly."
)
async def portfolio_health_check(
    service: PortfolioService = Depends(get_portfolio_service)
):
    """Portfolio service health check."""
    try:
        # Simple test to check if service is working
        await service.get_portfolio_stats()
        
        return {
            "success": True,
            "message": "Portfolio service is healthy",
            "data": {"status": "healthy", "service": "portfolio"}
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "success": False,
                "message": "Portfolio service is unhealthy",
                "error_details": {"service": "portfolio", "error": str(e)}
            }
        )