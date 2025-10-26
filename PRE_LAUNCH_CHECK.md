# 🎯 启动前检查清单

在启动网站之前，请按照此清单确保一切就绪。

## 📋 环境准备检查

### 1. 软件版本检查
```bash
# 检查 Node.js 版本（需要 18+）
node --version

# 检查 Python 版本（需要 3.11+）
python --version

# 检查 npm 版本
npm --version
```

### 2. 创建环境配置文件

#### 前端配置文件：`.env.local`
在**项目根目录**创建此文件：
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Windows 快速创建：**
```powershell
New-Item -Path ".env.local" -ItemType File -Force
Add-Content -Path ".env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8000"
```

#### 后端配置文件：`backend/.env`
在 **backend/** 目录创建此文件，复制以下内容：
```env
APP_NAME=BNBU EAP Assistant
APP_VERSION=0.1.0
DEBUG=True
DATABASE_URL=sqlite:///./test.db
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
CORS_ORIGINS=["http://localhost:3000"]
MAX_FILE_SIZE_MB=50
ALLOWED_FILE_TYPES=pdf,doc,docx,txt
UPLOAD_DIR=./uploads
AI_PROVIDER=coze
AI_API_KEY=your-ai-api-key-here
```

详细配置说明见 `ENV_SETUP.md`

### 3. 安装依赖

#### 后端依赖
```bash
cd backend

# 创建虚拟环境（仅首次）
python -m venv venv

# 激活虚拟环境
.\venv\Scripts\activate     # Windows
# source venv/bin/activate  # Mac/Linux

# 安装依赖
pip install -r requirements.txt
```

**验证安装：**
```bash
pip list | findstr fastapi  # Windows
# pip list | grep fastapi   # Mac/Linux
```

#### 前端依赖
```bash
# 返回项目根目录
cd ..

# 安装依赖
npm install
```

**验证安装：**
```bash
npm list next
```

## 🚀 启动检查

### 方法 A: 使用自动启动脚本（推荐）

#### Windows:
双击 `start.bat` 文件，或在 PowerShell 中：
```powershell
.\start.bat
```

#### Linux/Mac:
```bash
chmod +x start.sh
./start.sh
```

### 方法 B: 手动启动

#### 启动后端（终端1）
```bash
cd backend
.\venv\Scripts\activate    # 确保虚拟环境激活
python run.py
```

**✅ 成功标志：**
```
Initializing database...
Database initialized successfully!
Starting FastAPI server...
INFO: Uvicorn running on http://0.0.0.0:8000
```

**测试后端：** 访问 http://localhost:8000/health
应该看到：
```json
{
  "status": "healthy",
  "version": "0.1.0"
}
```

#### 启动前端（终端2）
```bash
npm run dev
```

**✅ 成功标志：**
```
- ready started server on 0.0.0.0:3000
- Local:        http://localhost:3000
```

## 🧪 功能测试

### 1. 登录测试
1. 访问 http://localhost:3000
2. 应自动重定向到登录页
3. 使用测试账号登录：
   - 学生: `student001` / `student123`
   - 教师: `teacher001` / `teacher123`

### 2. 学生端测试
登录后测试以下功能：

#### ✅ 仪表盘
- [ ] 显示欢迎信息
- [ ] 显示统计卡片
- [ ] 可以点击 "Start 1v1 Tutoring"

#### ✅ 材料选择
- [ ] 可以输入材料代码
- [ ] 可以点击推荐材料
- [ ] 跳转到聊天页面

#### ✅ 聊天页面
- [ ] 显示欢迎消息
- [ ] 可以输入文字
- [ ] 可以发送消息
- [ ] 收到 AI 回复（占位文本）
- [ ] 可以点击 "Take Quiz"

#### ✅ 测验页面
- [ ] 显示题目
- [ ] 可以选择答案
- [ ] 可以前后翻页
- [ ] 显示倒计时
- [ ] 提交后显示成绩

#### ✅ 报告页面
- [ ] 显示报告列表
- [ ] 可以查看报告详情
- [ ] 显示评分图表

### 3. 教师端测试
用 `teacher001` 登录测试：

#### ✅ 材料管理
- [ ] 显示材料列表
- [ ] 可以搜索和筛选
- [ ] 点击 "Upload Material"

#### ✅ 材料上传
- [ ] 可以拖拽文件
- [ ] 可以浏览选择文件
- [ ] 可以填写标题和描述
- [ ] 提交后返回列表

## 🔍 故障排查

### 问题 1: 后端启动失败

**错误**: `ModuleNotFoundError: No module named 'fastapi'`
**解决**: 
```bash
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

**错误**: `No module named 'app'`
**解决**: 确保在 `backend/` 目录下运行 `python run.py`

### 问题 2: 前端启动失败

**错误**: `Module not found: Can't resolve '@/...'`
**解决**:
```bash
# 删除依赖并重装
rm -rf node_modules package-lock.json
npm install
```

**错误**: `Port 3000 is already in use`
**解决**:
```bash
# 更改端口
npm run dev -- -p 3001
```

### 问题 3: 登录失败

**现象**: 点击登录无反应
**检查**:
1. 浏览器控制台是否有错误
2. 后端是否正常运行
3. `.env.local` 中的 API URL 是否正确

### 问题 4: API 请求 404

**现象**: 页面显示，但功能不工作
**检查**:
```bash
# 测试后端 API
curl http://localhost:8000/health

# 查看 API 文档
# 访问 http://localhost:8000/docs
```

### 问题 5: 样式不显示

**解决**:
```bash
# 清除 Next.js 缓存
rm -rf .next
npm run dev
```

## 📊 系统资源检查

启动后检查：
- 后端内存占用：约 100-200 MB
- 前端内存占用：约 200-300 MB
- 端口使用：
  - 3000 (前端)
  - 8000 (后端)

## ✅ 最终检查清单

启动前确认：
- [ ] Node.js 18+ 已安装
- [ ] Python 3.11+ 已安装
- [ ] `.env.local` 已创建
- [ ] `backend/.env` 已创建
- [ ] 后端依赖已安装
- [ ] 前端依赖已安装

启动后确认：
- [ ] 后端运行在 http://localhost:8000
- [ ] 前端运行在 http://localhost:3000
- [ ] 可以访问登录页面
- [ ] 可以成功登录
- [ ] 所有页面可以访问
- [ ] 页面交互正常

## 🎉 准备就绪！

如果所有检查都通过，恭喜您！网站已准备好使用。

现在可以：
1. ✅ 测试所有 UI 功能
2. 🔲 准备接入 AI API
3. 🔲 实现文件上传处理
4. 🔲 完善数据库操作

有任何问题，请参考：
- `QUICKSTART_CN.md` - 详细启动指南
- `FEATURE_CHECKLIST.md` - 功能清单
- `ENV_SETUP.md` - 环境配置
- API 文档 - http://localhost:8000/docs

