"""
Authentication dependencies for FastAPI.
"""
from typing import Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .clerk_auth import clerk_auth
import logging

logger = logging.getLogger(__name__)

# HTTP Bearer token scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """Get current authenticated user from Clerk token."""
    try:
        user_data = await clerk_auth.verify_token(credentials.credentials)
        return user_data
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Authentication error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )


async def get_current_admin_user(
    current_user: Dict[str, Any] = Depends(get_current_user)
) -> Dict[str, Any]:
    """Get current user and verify admin privileges."""
    if not clerk_auth.is_admin_user(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user


async def get_optional_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False))
) -> Dict[str, Any] | None:
    """Get current user if token is provided, otherwise return None."""
    if not credentials:
        return None
    
    try:
        user_data = await clerk_auth.verify_token(credentials.credentials)
        return user_data
    except HTTPException:
        return None
    except Exception as e:
        logger.error(f"Optional authentication error: {e}")
        return None