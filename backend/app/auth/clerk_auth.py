"""
Clerk authentication module.
"""
import jwt
import requests
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
import logging
from ..core.config import settings

logger = logging.getLogger(__name__)


class ClerkAuthenticator:
    """Clerk authentication handler."""
    
    def __init__(self):
        self.clerk_secret_key = settings.clerk_secret_key
        self.clerk_issuer = settings.clerk_issuer
        self.jwks_cache = {}
        
    async def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify Clerk JWT token and return user data."""
        try:
            # Remove Bearer prefix if present
            if token.startswith("Bearer "):
                token = token[7:]
            
            # Get token header to find the key ID
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
            
            if not kid:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token missing key ID"
                )
            
            # Get public key for verification
            public_key = await self._get_public_key(kid)
            
            # Verify and decode token
            payload = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                issuer=self.clerk_issuer,
                options={"verify_aud": False}  # Clerk doesn't use audience
            )
            
            return payload
            
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
        except InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication failed"
            )
    
    async def _get_public_key(self, kid: str) -> str:
        """Get public key from Clerk's JWKS endpoint."""
        if kid in self.jwks_cache:
            return self.jwks_cache[kid]
        
        try:
            # Fetch JWKS from Clerk
            jwks_url = f"{self.clerk_issuer}/.well-known/jwks.json"
            response = requests.get(jwks_url, timeout=10)
            response.raise_for_status()
            
            jwks = response.json()
            
            # Find the key with matching kid
            for key in jwks.get("keys", []):
                if key.get("kid") == kid:
                    # Convert JWK to PEM format
                    public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
                    pem_key = public_key.public_key().public_bytes(
                        encoding=jwt.serialization.Encoding.PEM,
                        format=jwt.serialization.PublicFormat.SubjectPublicKeyInfo
                    ).decode()
                    
                    # Cache the key
                    self.jwks_cache[kid] = pem_key
                    return pem_key
            
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Public key not found"
            )
            
        except requests.RequestException as e:
            logger.error(f"Failed to fetch JWKS: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to verify token"
            )
    
    def is_admin_user(self, user_data: Dict[str, Any]) -> bool:
        """Check if user has admin privileges."""
        # Check public metadata for admin role
        public_metadata = user_data.get("public_metadata", {})
        private_metadata = user_data.get("private_metadata", {})
        
        # Check multiple possible locations for admin flag
        return (
            public_metadata.get("role") == "admin" or
            public_metadata.get("is_admin") is True or
            private_metadata.get("role") == "admin" or
            private_metadata.get("is_admin") is True
        )


# Global authenticator instance
clerk_auth = ClerkAuthenticator()