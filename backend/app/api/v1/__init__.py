from fastapi import APIRouter
from app.api.v1.endpoints import auth, materials, sessions, ai

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(materials.router, prefix="/materials", tags=["Materials"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["Sessions"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI"])

