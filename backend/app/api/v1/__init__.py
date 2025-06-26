"""
API v1 router configuration.
"""
from fastapi import APIRouter
from . import (
    portfolio_endpoints, 
    admin_portfolio_endpoints,
    public_portfolio_endpoints,
    health_endpoints, 
    news_endpoints
)

api_router = APIRouter()

# Include public portfolio endpoints
api_router.include_router(
    public_portfolio_endpoints.router,
    tags=["public-portfolios"],
    prefix=""
)

# Include admin portfolio endpoints  
api_router.include_router(
    admin_portfolio_endpoints.router,
    tags=["admin-portfolios"],
    prefix=""
)

# Include legacy portfolio endpoints (for backward compatibility)
api_router.include_router(
    portfolio_endpoints.router,
    tags=["portfolios-legacy"],
    prefix=""
)

api_router.include_router(
    health_endpoints.router,
    tags=["health"],
    prefix=""
)

api_router.include_router(
    news_endpoints.router,
    tags=["news"],
    prefix=""
)

# Keep test endpoint for backward compatibility
@api_router.get("/test", tags=["test"])
async def test_endpoint():
    """Test endpoint to verify API is working."""
    return {"message": "API v1 is working!", "status": "success"}