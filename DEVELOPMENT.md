# 开发指南

本文档为开发者提供项目开发的详细说明。

---

## 🎨 UI 组件开发

### 使用现有 UI 原型

项目在 `ui_pages_496770912770/` 目录下有完整的 HTML 原型，可以直接参考样式和布局。

**颜色变量**:
```css
--primary: #1B8C79;
--secondary: #37436A;
--accent: #080D1E;
--text-primary: #1F2937;
--text-secondary: #6B7280;
--bg-light: #F9FAFB;
--border-light: #E5E7EB;
```

**常用组件类名**:
- `.card-hover`: 卡片悬停效果
- `.nav-item-active`: 激活的导航项
- `.sidebar-transition`: 侧边栏过渡动画

---

## 🔌 API 接口开发

### 添加新端点

1. 在 `backend/app/api/v1/endpoints/` 创建新文件
2. 定义路由:

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/example")
async def example_endpoint():
    return {"message": "Example"}
```

3. 在 `backend/app/api/v1/__init__.py` 注册:

```python
from app.api.v1.endpoints import example

api_router.include_router(example.router, prefix="/example", tags=["Example"])
```

### API 响应格式

统一使用以下格式:

```python
from pydantic import BaseModel

class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[str] = None
```

---

## 🗄️ 数据库开发

### 添加新模型

1. 在 `backend/app/db/models.py` 添加:

```python
class NewModel(Base):
    __tablename__ = "new_models"
    
    id = Column(String(50), primary_key=True, index=True)
    # 添加其他字段
    created_at = Column(DateTime, default=datetime.utcnow)
```

2. 运行迁移:

```bash
# 初始化 Alembic（首次）
alembic init alembic

# 生成迁移
alembic revision --autogenerate -m "Add new model"

# 应用迁移
alembic upgrade head
```

---

## 🤖 AI 集成开发

### 接入 AI 服务

在 `backend/app/services/ai_provider.py` 创建：

```python
import httpx
from app.core.config import settings

class AIProvider:
    def __init__(self):
        self.api_key = settings.AI_API_KEY
        self.api_url = settings.AI_API_URL
    
    async def chat(self, messages: list, **kwargs):
        """
        调用 AI API
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.api_url}/chat",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "messages": messages,
                    "model": settings.AI_MODEL,
                    **kwargs
                }
            )
            return response.json()
```

### 流式响应

```python
from fastapi.responses import StreamingResponse

async def stream_chat(messages: list):
    async for chunk in ai_provider.stream_chat(messages):
        yield f"data: {json.dumps(chunk)}\n\n"

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        stream_chat(request.messages),
        media_type="text/event-stream"
    )
```

---

## 🧪 测试

### 后端测试

```bash
cd backend
pytest
```

编写测试:

```python
# tests/test_auth.py
def test_login():
    response = client.post("/api/v1/auth/login", data={
        "username": "student001",
        "password": "student123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

### 前端测试

```bash
npm run test
```

---

## 📝 代码规范

### Python (后端)

使用 Black + isort:

```bash
pip install black isort
black .
isort .
```

### TypeScript (前端)

使用 ESLint + Prettier:

```bash
npm run lint
npm run format
```

---

## 🔄 Git 工作流

### 分支策略

- `main`: 生产环境
- `develop`: 开发环境
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复

### 提交规范

```bash
git commit -m "feat: 添加 AI 对话流式响应"
git commit -m "fix: 修复登录页面样式问题"
git commit -m "docs: 更新 API 文档"
```

---

## 🐞 调试技巧

### 后端调试

在 VSCode 中配置 `launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "FastAPI",
            "type": "python",
            "request": "launch",
            "module": "uvicorn",
            "args": [
                "app.main:app",
                "--reload"
            ],
            "jinja": true
        }
    ]
}
```

### 前端调试

使用 React DevTools 和 Chrome DevTools。

---

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [FastAPI 文档](https://fastapi.tiangolo.com)
- [SQLAlchemy 文档](https://docs.sqlalchemy.org)
- [TailwindCSS 文档](https://tailwindcss.com/docs)


