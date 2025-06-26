"""
Admin Portfolio API endpoints with authentication.
"""
from typing import List, Dict, Any
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse

from app.dependencies import get_admin_portfolio_service
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
    "/admin/portfolios",
    response_model=PaginatedResponse[PortfolioResponse],
    summary="Get portfolios (Admin)",
    description="Retrieve a list of portfolios with optional filtering. Requires admin authentication."
)
async def get_admin_portfolios(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    industry: str = Query(None, description="Filter by industry"),
    year: int = Query(None, ge=2000, le=2100, description="Filter by year"),
    status: str = Query("active", description="Filter by status"),
    search: str = Query(None, min_length=1, max_length=100, description="Search term"),
    sort_by: str = Query("created_at", description="Sort field"),
    sort_order: str = Query("desc", pattern="^(asc|desc)$", description="Sort order"),
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Get portfolios with filtering and pagination (Admin only)."""
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
    "/admin/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Get portfolio by ID (Admin)",
    description="Retrieve a specific portfolio with all related data. Requires admin authentication."
)
async def get_admin_portfolio(
    portfolio_id: UUID,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Get portfolio by ID with all relations (Admin only)."""
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
    "/admin/portfolios/stats/overview",
    response_model=SuccessResponse,
    summary="Get portfolio statistics (Admin)",
    description="Get comprehensive statistics about portfolios. Requires admin authentication."
)
async def get_admin_portfolio_stats(
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Get portfolio statistics (Admin only)."""
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
    "/admin/portfolios/stats/categories",
    response_model=SuccessResponse,
    summary="Get category filter statistics (Admin)",
    description="Get category statistics for filter UI components. Requires admin authentication."
)
async def get_admin_category_filter_stats(
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Get category statistics for filters (Admin only)."""
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
    "/admin/portfolios",
    response_model=SuccessResponse,
    status_code=201,
    summary="Create new portfolio (Admin)",
    description="Create a new portfolio record. Requires admin authentication."
)
async def create_admin_portfolio(
    portfolio_data: PortfolioCreate,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Create new portfolio (Admin only)."""
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
    "/admin/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Update portfolio (Admin)",
    description="Update an existing portfolio. Requires admin authentication."
)
async def update_admin_portfolio(
    portfolio_id: UUID,
    portfolio_data: PortfolioUpdate,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Update existing portfolio (Admin only)."""
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
    "/admin/portfolios/{portfolio_id}",
    response_model=SuccessResponse,
    summary="Delete portfolio (Admin)",
    description="Soft delete a portfolio. Requires admin authentication."
)
async def delete_admin_portfolio(
    portfolio_id: UUID,
    service: PortfolioService = Depends(get_admin_portfolio_service)
):
    """Delete portfolio (Admin only)."""
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