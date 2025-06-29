"""
Application configuration module.
"""
from pydantic_settings import BaseSettings
from typing import List
import os
import json


class Settings(BaseSettings):
    """Application settings."""
    
    # Supabase Configuration
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    
    # Database Configuration (Optional - for direct PostgreSQL connection)
    database_url: str = ""
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True
    
    # Security
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Clerk Authentication
    clerk_secret_key: str = ""
    clerk_issuer: str = "https://clerk.dev"
    
    # CORS Configuration - can be overridden by environment variable
    cors_origins: List[str] = [
        "http://localhost:3000",      # frontend
        "http://localhost:3001",      # frontend-admin
        "http://127.0.0.1:3000",      # frontend (IPv4)
        "http://127.0.0.1:3001",      # frontend-admin (IPv4)
        "https://ghoona-goods-2.vercel.app",  # production frontend
    ]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Override CORS origins from environment if provided
        cors_env = os.getenv("CORS_ORIGINS")
        if cors_env:
            try:
                self.cors_origins = json.loads(cors_env)
            except json.JSONDecodeError:
                # If not valid JSON, treat as comma-separated string
                self.cors_origins = [origin.strip() for origin in cors_env.split(",")]
    
    # Environment
    environment: str = "development"
    
    # API Settings
    api_v1_prefix: str = "/api/v1"
    project_name: str = "Ghoona Goods API"
    project_description: str = "API for Ghoona Goods manufacturing portfolio management"
    project_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


def get_settings() -> Settings:
    """Get application settings."""
    return Settings()


# Global settings instance
settings = get_settings()