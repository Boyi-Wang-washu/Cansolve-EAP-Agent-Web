from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Session as SessionModel, Message, SessionStatus
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()


class MessageResponse(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    created_at: str


class SessionResponse(BaseModel):
    id: str
    user_id: str
    material_id: str
    mode: str
    status: str
    started_at: str
    ended_at: Optional[str]
    messages: List[MessageResponse]


class CreateSessionRequest(BaseModel):
    material_id: str
    mode: str = "1v1"


class SessionListResponse(BaseModel):
    total: int
    sessions: List[SessionResponse]


@router.post("", response_model=SessionResponse)
async def create_session(
    request: CreateSessionRequest,
    db: Session = Depends(get_db),
):
    """
    创建新会话（占位）
    """
    session_id = str(uuid.uuid4())
    
    return SessionResponse(
        id=session_id,
        user_id="s001",
        material_id=request.material_id,
        mode=request.mode,
        status=SessionStatus.IN_PROGRESS.value,
        started_at=datetime.utcnow().isoformat(),
        ended_at=None,
        messages=[],
    )


@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(
    session_id: str,
    db: Session = Depends(get_db),
):
    """
    获取会话详情（占位）
    """
    # TODO: 实现真实的数据库查询
    raise HTTPException(status_code=404, detail="Session not found")


@router.get("", response_model=SessionListResponse)
async def list_sessions(
    skip: int = 0,
    limit: int = 20,
    user_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    获取会话列表（占位）
    """
    return SessionListResponse(
        total=0,
        sessions=[],
    )


@router.post("/{session_id}/end")
async def end_session(
    session_id: str,
    db: Session = Depends(get_db),
):
    """
    结束会话（占位）
    """
    # TODO: 实现会话结束逻辑
    return {"message": "Session ended successfully"}

