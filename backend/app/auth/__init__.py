"""
Authentication module.
"""
from .clerk_auth import clerk_auth, ClerkAuthenticator

__all__ = ["clerk_auth", "ClerkAuthenticator"]