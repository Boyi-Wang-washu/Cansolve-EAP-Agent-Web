from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from pydantic import BaseModel
from typing import List, Optional, AsyncGenerator
import json
import asyncio

router = APIRouter()


class ChatMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str


class ChatRequest(BaseModel):
    session_id: str
    message: str
    history: Optional[List[ChatMessage]] = []


class ChatResponse(BaseModel):
    session_id: str
    message: ChatMessage
    tokens_used: Optional[int] = None


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    """
    AI 对话接口（占位 - 非流式）
    
    后续接入 AI 服务商时实现：
    1. 读取会话历史
    2. 调用 AI API（Coze/智谱/等）
    3. 保存消息到数据库
    4. 返回 AI 回复
    """
    # 模拟 AI 回复
    ai_response = f"This is a placeholder response. Your message was: '{request.message}'. AI integration will be implemented in the next phase."
    
    return ChatResponse(
        session_id=request.session_id,
        message=ChatMessage(
            role="assistant",
            content=ai_response,
        ),
        tokens_used=0,
    )


async def generate_stream_response(message: str) -> AsyncGenerator[str, None]:
    """
    流式响应生成器（占位）
    """
    response = f"This is a placeholder streaming response for: '{message}'"
    
    # 模拟流式输出
    words = response.split()
    for word in words:
        await asyncio.sleep(0.1)  # 模拟延迟
        chunk = {
            "delta": word + " ",
            "done": False,
        }
        yield f"data: {json.dumps(chunk)}\n\n"
    
    # 完成标记
    final_chunk = {
        "delta": "",
        "done": True,
    }
    yield f"data: {json.dumps(final_chunk)}\n\n"


@router.post("/chat/stream")
async def chat_stream(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    """
    AI 对话接口（占位 - 流式）
    
    使用 Server-Sent Events (SSE) 实现流式响应
    """
    return StreamingResponse(
        generate_stream_response(request.message),
        media_type="text/event-stream",
    )


@router.post("/generate-quiz")
async def generate_quiz(
    session_id: str,
    material_id: str,
    db: Session = Depends(get_db),
):
    """
    生成小测（占位）
    
    后续实现：
    1. 读取材料内容
    2. 调用 AI 生成题目
    3. 返回题目列表
    """
    return {
        "quiz_id": "quiz_placeholder",
        "questions": [
            {
                "type": "multiple_choice",
                "question": "Placeholder question?",
                "options": ["A", "B", "C", "D"],
                "correct_answer": "A",
            }
        ],
    }


@router.post("/generate-report")
async def generate_report(
    session_id: str,
    db: Session = Depends(get_db),
):
    """
    生成学习报告（占位）
    
    后续实现：
    1. 分析会话历史
    2. 调用 AI 生成报告
    3. 保存报告到数据库
    4. 返回报告ID
    """
    return {
        "report_id": "report_placeholder",
        "status": "generating",
        "message": "Report generation will be implemented in next phase",
    }

