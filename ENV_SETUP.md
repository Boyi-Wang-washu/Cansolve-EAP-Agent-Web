# 环境配置指南

## 前端环境配置

在项目根目录创建 `.env.local` 文件：

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 后端环境配置

在 `backend/` 目录创建 `.env` 文件：

```env
# Application Settings
APP_NAME=BNBU EAP Assistant
APP_VERSION=0.1.0
DEBUG=True

# Database Configuration
# For development, using SQLite (no additional setup needed)
DATABASE_URL=sqlite:///./test.db

# For production, use PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/bnbu_eap

# Redis Configuration (Optional for MVP)
REDIS_URL=redis://localhost:6379/0

# JWT Authentication
JWT_SECRET_KEY=your-secret-key-change-in-production-please-use-strong-random-string
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# CORS Origins (adjust if needed)
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]

# File Upload Settings
MAX_FILE_SIZE_MB=50
ALLOWED_FILE_TYPES=pdf,doc,docx,txt
UPLOAD_DIR=./uploads

# AI Provider Settings (Placeholder - 您后续接入AI时配置)
AI_PROVIDER=coze
AI_API_KEY=your-ai-api-key-here
AI_API_URL=https://api.coze.com/v1
AI_MODEL=gpt-4
AI_MAX_TOKENS=1000
AI_TEMPERATURE=0.7

# Session Settings
SESSION_TIMEOUT_MINUTES=30
MAX_SESSIONS_PER_DAY=5
```

## 快速设置命令

### Windows PowerShell:
```powershell
# 前端
New-Item -Path ".env.local" -ItemType File -Force
Add-Content -Path ".env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8000"

# 后端
New-Item -Path "backend\.env" -ItemType File -Force
# 然后手动复制上面的配置内容到 backend\.env
```

### Linux/Mac:
```bash
# 前端
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# 后端
cd backend
cat > .env << 'EOF'
# 复制上面的后端配置内容
EOF
```

