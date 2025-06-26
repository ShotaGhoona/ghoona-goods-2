"""
Database connection and Supabase client configuration.
"""
from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class DatabaseManager:
    """Database connection manager."""
    
    def __init__(self):
        self._client: Client = None
        
    def get_client(self) -> Client:
        """Get Supabase client instance."""
        if self._client is None:
            try:
                self._client = create_client(
                    settings.supabase_url,
                    settings.supabase_anon_key
                )
                logger.info("Supabase client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Supabase client: {e}")
                raise
        return self._client
    
    def get_admin_client(self) -> Client:
        """Get Supabase admin client with service role key."""
        try:
            admin_client = create_client(
                settings.supabase_url,
                settings.supabase_service_role_key
            )
            logger.info("Supabase admin client initialized successfully")
            return admin_client
        except Exception as e:
            logger.error(f"Failed to initialize Supabase admin client: {e}")
            raise
    
    async def test_connection(self) -> bool:
        """Test database connection."""
        try:
            client = self.get_client()
            # Simple test query
            result = client.table('portfolios').select('id').limit(1).execute()
            logger.info("Database connection test successful")
            return True
        except Exception as e:
            logger.error(f"Database connection test failed: {e}")
            return False


# Global database manager instance
db_manager = DatabaseManager()


def get_supabase_client() -> Client:
    """Dependency function to get Supabase client."""
    return db_manager.get_client()


def get_supabase_admin_client() -> Client:
    """Dependency function to get Supabase admin client."""
    return db_manager.get_admin_client()