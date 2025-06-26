"""
Health check API endpoints.
"""
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core.database import get_supabase_client
from app.core.config import settings
from app.schemas.base_schemas import HealthCheckResponse
from supabase import Client

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthCheckResponse,
    summary="System health check",
    description="Check the overall health of the API and its dependencies."
)
async def health_check(
    client: Client = Depends(get_supabase_client)
):
    """System health check."""
    try:
        # Test database connection
        try:
            result = client.table('portfolios').select('id').limit(1).execute()
            database_status = "connected"
        except Exception as e:
            database_status = f"error: {str(e)}"
        
        # Determine overall status
        overall_status = "healthy" if database_status == "connected" else "unhealthy"
        
        health_data = {
            "status": overall_status,
            "version": settings.project_version,
            "database_status": database_status
        }
        
        if overall_status == "healthy":
            return health_data
        else:
            return JSONResponse(
                status_code=503,
                content=health_data
            )
        
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "version": settings.project_version,
                "database_status": f"error: {str(e)}"
            }
        )


@router.get(
    "/health/detailed",
    summary="Detailed health check",
    description="Get detailed health information about all system components."
)
async def detailed_health_check(
    client: Client = Depends(get_supabase_client)
):
    """Detailed health check with component-specific information."""
    health_info = {
        "status": "healthy",
        "version": settings.project_version,
        "environment": settings.environment,
        "components": {}
    }
    
    # Database health
    try:
        result = client.table('portfolios').select('id').limit(1).execute()
        health_info["components"]["database"] = {
            "status": "healthy",
            "message": "Database connection successful"
        }
    except Exception as e:
        health_info["components"]["database"] = {
            "status": "unhealthy",
            "message": f"Database connection failed: {str(e)}"
        }
        health_info["status"] = "unhealthy"
    
    # API health
    health_info["components"]["api"] = {
        "status": "healthy",
        "message": "API is running"
    }
    
    # Configuration health
    config_status = "healthy"
    config_messages = []
    
    # Check required environment variables
    required_vars = ["supabase_url", "supabase_anon_key"]
    for var in required_vars:
        if not getattr(settings, var, None):
            config_status = "unhealthy"
            config_messages.append(f"Missing {var}")
    
    health_info["components"]["configuration"] = {
        "status": config_status,
        "message": "Configuration loaded" if config_status == "healthy" else "; ".join(config_messages)
    }
    
    if config_status == "unhealthy":
        health_info["status"] = "unhealthy"
    
    # Return appropriate status code
    status_code = 200 if health_info["status"] == "healthy" else 503
    
    return JSONResponse(
        status_code=status_code,
        content=health_info
    )