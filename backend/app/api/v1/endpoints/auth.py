from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User, UserRole
from app.core.security import verify_password, create_access_token, get_password_hash
from pydantic import BaseModel
from typing import Optional
import uuid

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


class UserResponse(BaseModel):
    id: str
    name: str
    email: Optional[str]
    role: str
    class_id: Optional[str]
    avatar: Optional[str]
    created_at: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


# 模拟用户数据（MVP 阶段）
MOCK_USERS = {
    "student001": {
        "id": "s001",
        "name": "Alice Wang",
        "email": "alice.wang@student.bnbu.edu",
        "password": "student123",
        "role": UserRole.STUDENT,
        "class_id": "EAP-2024-A",
    },
    "teacher001": {
        "id": "t001",
        "name": "Prof. John Smith",
        "email": "john.smith@teacher.bnbu.edu",
        "password": "teacher123",
        "role": UserRole.TEACHER,
    },
    "admin": {
        "id": "a001",
        "name": "System Admin",
        "email": "admin@bnbu.edu",
        "password": "admin123",
        "role": UserRole.ADMIN,
    },
}


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    用户登录（MVP 使用模拟数据）
    """
    # 验证用户
    user_data = MOCK_USERS.get(form_data.username)
    
    if not user_data or user_data["password"] != form_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 生成 token
    access_token = create_access_token(
        data={"sub": user_data["id"], "role": user_data["role"].value}
    )
    
    # 返回用户信息和 token
    user_response = UserResponse(
        id=user_data["id"],
        name=user_data["name"],
        email=user_data.get("email"),
        role=user_data["role"].value,
        class_id=user_data.get("class_id"),
        avatar=None,
        created_at="2024-01-01T00:00:00Z",
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_response,
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    获取当前用户信息
    """
    from app.core.security import decode_access_token
    
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = payload.get("sub")
    
    # 从模拟数据中查找用户
    for username, user_data in MOCK_USERS.items():
        if user_data["id"] == user_id:
            return UserResponse(
                id=user_data["id"],
                name=user_data["name"],
                email=user_data.get("email"),
                role=user_data["role"].value,
                class_id=user_data.get("class_id"),
                avatar=None,
                created_at="2024-01-01T00:00:00Z",
            )
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )

