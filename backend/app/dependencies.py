"""
FastAPI dependency injection.
"""
from typing import Dict, Any
from fastapi import Depends
from supabase import Client
from .core.database import get_supabase_client, get_supabase_admin_client
from .repositories.portfolio_repository import PortfolioRepository
from .repositories.news_repository import NewsRepository
from .services.portfolio_service import PortfolioService
from .services.news_service import NewsService
from .auth.dependencies import get_current_admin_user


def get_portfolio_repository(
    client: Client = Depends(get_supabase_client)
) -> PortfolioRepository:
    """Get portfolio repository instance."""
    return PortfolioRepository(client)


def get_portfolio_service(
    repository: PortfolioRepository = Depends(get_portfolio_repository)
) -> PortfolioService:
    """Get portfolio service instance."""
    return PortfolioService(repository)


def get_admin_portfolio_repository(
    client: Client = Depends(get_supabase_admin_client)
) -> PortfolioRepository:
    """Get portfolio repository with admin privileges."""
    return PortfolioRepository(client)


def get_admin_portfolio_service(
    repository: PortfolioRepository = Depends(get_admin_portfolio_repository),
    current_user: Dict[str, Any] = Depends(get_current_admin_user)
) -> PortfolioService:
    """Get portfolio service with admin privileges and authentication."""
    return PortfolioService(repository)


# News dependencies
def get_news_repository(
    client: Client = Depends(get_supabase_client)
) -> NewsRepository:
    """Get news repository instance."""
    return NewsRepository(client)


def get_news_service(
    repository: NewsRepository = Depends(get_news_repository)
) -> NewsService:
    """Get news service instance."""
    return NewsService(repository)


def get_admin_news_repository(
    client: Client = Depends(get_supabase_admin_client)
) -> NewsRepository:
    """Get news repository with admin privileges."""
    return NewsRepository(client)


def get_admin_news_service(
    repository: NewsRepository = Depends(get_admin_news_repository),
    current_user: Dict[str, Any] = Depends(get_current_admin_user)
) -> NewsService:
    """Get news service with admin privileges and authentication."""
    return NewsService(repository)