from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.database import Base


class UserRole(str, enum.Enum):
    """用户角色枚举"""
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"


class SessionMode(str, enum.Enum):
    """会话模式枚举"""
    ONE_ON_ONE = "1v1"
    GROUP = "group"
    VIDEO = "video"


class SessionStatus(str, enum.Enum):
    """会话状态枚举"""
    IN_PROGRESS = "in_progress"
    ENDED = "ended"
    FAILED = "failed"


class User(Base):
    """用户表"""
    __tablename__ = "users"
    
    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=True, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.STUDENT)
    class_id = Column(String(50), nullable=True)
    avatar = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sessions = relationship("Session", back_populates="user")
    materials = relationship("Material", back_populates="creator")
    reports = relationship("LearningReport", back_populates="user")


class Material(Base):
    """阅读材料表"""
    __tablename__ = "materials"
    
    id = Column(String(50), primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True)  # 唯一索引码
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    storage_url = Column(String(500), nullable=False)  # 文件存储路径
    created_by = Column(String(50), ForeignKey("users.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    version = Column(Integer, default=1)
    tags = Column(JSON, nullable=True)  # 标签列表
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    creator = relationship("User", back_populates="materials")
    texts = relationship("MaterialText", back_populates="material", cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="material")


class MaterialText(Base):
    """材料文本表（用于存储抽取的文本）"""
    __tablename__ = "material_texts"
    
    id = Column(String(50), primary_key=True, index=True)
    material_id = Column(String(50), ForeignKey("materials.id"), nullable=False)
    version = Column(Integer, default=1)
    text_full = Column(Text, nullable=False)  # 完整抽取文本
    char_count = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    material = relationship("Material", back_populates="texts")


class Session(Base):
    """会话表"""
    __tablename__ = "sessions"
    
    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=False)
    material_id = Column(String(50), ForeignKey("materials.id"), nullable=False)
    mode = Column(SQLEnum(SessionMode), nullable=False, default=SessionMode.ONE_ON_ONE)
    status = Column(SQLEnum(SessionStatus), nullable=False, default=SessionStatus.IN_PROGRESS)
    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="sessions")
    material = relationship("Material", back_populates="sessions")
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan")
    reports = relationship("LearningReport", back_populates="session")


class Message(Base):
    """消息表"""
    __tablename__ = "messages"
    
    id = Column(String(50), primary_key=True, index=True)
    session_id = Column(String(50), ForeignKey("sessions.id"), nullable=False)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    tokens = Column(Integer, nullable=True)  # Token 消耗
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    session = relationship("Session", back_populates="messages")


class LearningReport(Base):
    """学习报告表"""
    __tablename__ = "learning_reports"
    
    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=False)
    session_id = Column(String(50), ForeignKey("sessions.id"), nullable=False)
    material_id = Column(String(50), ForeignKey("materials.id"), nullable=False)
    rubric_json = Column(JSON, nullable=False)  # 多维度评分数据
    md_summary = Column(Text, nullable=True)  # Markdown 格式摘要
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="reports")
    session = relationship("Session", back_populates="reports")

