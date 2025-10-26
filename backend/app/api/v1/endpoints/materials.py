from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Material, MaterialText
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()


class MaterialResponse(BaseModel):
    id: str
    code: str
    title: str
    description: Optional[str]
    storage_url: str
    created_by: str
    is_active: bool
    version: int
    tags: Optional[List[str]]
    created_at: str


class MaterialListResponse(BaseModel):
    total: int
    materials: List[MaterialResponse]


@router.get("", response_model=MaterialListResponse)
async def list_materials(
    skip: int = 0,
    limit: int = 20,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """
    获取材料列表（占位）
    """
    # TODO: 实现真实的数据库查询
    return MaterialListResponse(
        total=0,
        materials=[],
    )


@router.get("/{material_id}", response_model=MaterialResponse)
async def get_material(
    material_id: str,
    db: Session = Depends(get_db),
):
    """
    获取单个材料详情（占位）
    """
    # TODO: 实现真实的数据库查询
    raise HTTPException(status_code=404, detail="Material not found")


@router.post("", response_model=MaterialResponse)
async def create_material(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    创建新材料（上传文件）- 占位
    """
    # TODO: 实现文件上传、文本抽取、材料创建
    # 生成唯一索引码
    material_code = f"ENG-2025-{str(uuid.uuid4())[:8].upper()}"
    
    # 返回模拟数据
    return MaterialResponse(
        id=str(uuid.uuid4()),
        code=material_code,
        title=title,
        description=description,
        storage_url="/uploads/placeholder.pdf",
        created_by="t001",
        is_active=True,
        version=1,
        tags=tags.split(",") if tags else [],
        created_at=datetime.utcnow().isoformat(),
    )


@router.put("/{material_id}", response_model=MaterialResponse)
async def update_material(
    material_id: str,
    title: Optional[str] = None,
    description: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """
    更新材料信息（占位）
    """
    # TODO: 实现材料更新
    raise HTTPException(status_code=404, detail="Material not found")


@router.delete("/{material_id}")
async def delete_material(
    material_id: str,
    db: Session = Depends(get_db),
):
    """
    删除材料（占位）
    """
    # TODO: 实现材料删除
    return {"message": "Material deleted successfully"}

