"""
Application Settings

This module contains application-wide settings and configuration
loaded from environment variables and config files.
"""

import os
from typing import Dict, Any, Optional
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

logger = logging.getLogger(__name__)


class Settings:
    """
    Application settings loaded from environment variables.
    """
    
    def __init__(self):
        # OpenAI Configuration
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-4")
        
        # Supabase Configuration
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        # FastAPI Configuration
        self.fastapi_host = os.getenv("FASTAPI_HOST", "0.0.0.0")
        self.fastapi_port = int(os.getenv("FASTAPI_PORT", "8000"))
        self.fastapi_reload = os.getenv("FASTAPI_RELOAD", "false").lower() == "true"
        
        # Chainlit Configuration
        self.chainlit_host = os.getenv("CHAINLIT_HOST", "0.0.0.0")
        self.chainlit_port = int(os.getenv("CHAINLIT_PORT", "8001"))
        
        # Logging Configuration
        self.log_level = os.getenv("LOG_LEVEL", "info").upper()
        self.log_format = os.getenv("LOG_FORMAT", "json")
        
        # Environment
        self.debug = os.getenv("DEBUG", "false").lower() == "true"
        self.environment = os.getenv("ENVIRONMENT", "development")
        
        # Sports API Configuration
        self.espn_api_base_url = os.getenv("ESPN_API_BASE_URL", "https://site.api.espn.com/apis/site/v2/sports")
        self.sportsdb_api_key = os.getenv("SPORTSDB_API_KEY")
        
        # Validate required settings
        self._validate_settings()
    
    def _validate_settings(self):
        """Validate that required settings are present."""
        required_settings = [
            ("OPENAI_API_KEY", self.openai_api_key),
            ("SUPABASE_URL", self.supabase_url),
            ("SUPABASE_SERVICE_ROLE_KEY", self.supabase_service_role_key),
        ]
        
        missing_settings = []
        for setting_name, setting_value in required_settings:
            if not setting_value:
                missing_settings.append(setting_name)
        
        if missing_settings:
            logger.error(f"Missing required environment variables: {', '.join(missing_settings)}")
            raise ValueError(f"Missing required environment variables: {', '.join(missing_settings)}")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert settings to dictionary (excluding sensitive values)."""
        return {
            "openai_model": self.openai_model,
            "fastapi_host": self.fastapi_host,
            "fastapi_port": self.fastapi_port,
            "fastapi_reload": self.fastapi_reload,
            "chainlit_host": self.chainlit_host,
            "chainlit_port": self.chainlit_port,
            "log_level": self.log_level,
            "log_format": self.log_format,
            "debug": self.debug,
            "environment": self.environment,
            "espn_api_base_url": self.espn_api_base_url,
        }


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get the global settings instance."""
    return settings 