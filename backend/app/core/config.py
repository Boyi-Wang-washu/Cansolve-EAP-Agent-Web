from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "BNBU EAP Assistant"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # Database
    DATABASE_URL: str = "sqlite:///./test.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # JWT
    JWT_SECRET_KEY: str = "your-jwt-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days for MVP
    
    # File Upload
    MAX_FILE_SIZE_MB: int = 50
    ALLOWED_FILE_TYPES: str = "pdf,doc,docx,txt"
    UPLOAD_DIR: str = "./uploads"
    
    # AI Provider (留好接口)
    AI_PROVIDER: str = "coze"
    AI_API_KEY: str = ""
    AI_API_URL: str = "https://api.coze.com/v1"
    AI_MODEL: str = "gpt-4"
    AI_MAX_TOKENS: int = 1000
    AI_TEMPERATURE: float = 0.7
    
    # Session
    SESSION_TIMEOUT_MINUTES: int = 30
    MAX_SESSIONS_PER_DAY: int = 5
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

