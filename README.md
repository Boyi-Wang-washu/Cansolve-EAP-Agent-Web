# BNBU EAP English Teaching Assistant - MVP

一个基于 AI 的英语教学辅助平台，为 BNBU 大学的学生和教师提供个性化的英语学习和教学支持。

## 🎯 项目概述

**当前状态**: MVP（最小可行产品）阶段

**核心功能**: 
- ✅ 用户认证（学生/教师/管理员角色模拟）
- ✅ 1v1 辅导对话界面（UI 完成，AI 接口占位）
- ✅ 材料管理（基础框架）
- ✅ 响应式设计（桌面端优先）

**待实现功能**:
- 🔲 AI 对话集成（扣子/智谱等）
- 🔲 文件上传和文本抽取
- 🔲 学习报告生成
- 🔲 数据可视化
- 🔲 统一身份认证对接

---

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: TailwindCSS
- **状态管理**: Zustand
- **数据请求**: React Query + Axios
- **图标**: Font Awesome

### 后端
- **框架**: FastAPI (Python 3.11+)
- **数据库**: PostgreSQL (或 SQLite 用于开发)
- **ORM**: SQLAlchemy 2.0
- **认证**: JWT (python-jose)
- **缓存**: Redis (可选)

---

## 📦 项目结构

```
.
├── frontend/                    # Next.js 前端
│   ├── src/
│   │   ├── app/                # 页面路由
│   │   │   ├── auth/           # 认证页面
│   │   │   ├── dashboard/      # 仪表盘
│   │   │   ├── tutor/          # 1v1 辅导
│   │   │   └── teacher/        # 教师端
│   │   ├── components/         # 组件
│   │   │   └── layout/         # 布局组件
│   │   ├── lib/                # 工具库
│   │   └── store/              # 状态管理
│   ├── package.json
│   └── next.config.mjs
│
├── backend/                     # FastAPI 后端
│   ├── app/
│   │   ├── api/                # API 路由
│   │   │   └── v1/
│   │   │       └── endpoints/  # API 端点
│   │   ├── core/               # 核心配置
│   │   ├── db/                 # 数据库
│   │   │   ├── database.py     # 数据库连接
│   │   │   └── models.py       # 数据模型
│   │   └── main.py             # 主应用
│   ├── requirements.txt
│   └── run.py                  # 启动脚本
│
└── README.md
```

---

## 🚀 快速开始

### 前提条件

- Node.js 18+ 和 npm
- Python 3.11+
- PostgreSQL (或使用 SQLite 进行本地开发)

### 1. 克隆项目

```bash
cd "全栈开发V1"
```

### 2. 启动后端

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量文件
copy .env.example .env     # Windows
# cp .env.example .env     # macOS/Linux

# 启动服务器（会自动初始化数据库）
python run.py
```

后端将在 `http://localhost:8000` 运行

API 文档: `http://localhost:8000/docs`

### 3. 启动前端

```bash
# 在新终端中，进入前端目录
cd ..  # 返回项目根目录

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端将在 `http://localhost:3000` 运行

### 4. 登录测试

打开浏览器访问 `http://localhost:3000`

**测试账号**:

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 学生 | student001 | student123 |
| 教师 | teacher001 | teacher123 |
| 管理员 | admin | admin123 |

---

## 🎨 UI 设计

本项目的 UI 设计参考了 `ui_pages_496770912770/` 目录下的 HTML 原型。

**设计规范**:
- 主色: `#1B8C79` (primary)
- 次色: `#37436A` (secondary)
- 强调色: `#080D1E` (accent)
- 响应式布局：支持 768px 及以上设备

---

## 📝 开发说明

### MVP 阶段特性

1. **模拟数据**: 当前使用硬编码的模拟用户和材料数据
2. **AI 占位**: AI 对话接口已预留，返回占位响应
3. **简化认证**: 使用简单的 JWT，无密码加密（仅 MVP）
4. **SQLite**: 默认使用 SQLite 数据库（生产环境需切换到 PostgreSQL）

### 后续开发计划

#### Phase 1: AI 集成
- [ ] 接入扣子（Coze）或其他 AI 平台 API
- [ ] 实现流式对话
- [ ] 语法纠错和语言点讲解
- [ ] 小测生成

#### Phase 2: 文件处理
- [ ] 文件上传功能
- [ ] PDF/DOC/TXT 文本抽取
- [ ] 材料版本管理
- [ ] 索引码生成

#### Phase 3: 学习报告
- [ ] 多维度评分
- [ ] 报告生成（AI 驱动）
- [ ] 数据可视化（Echarts）

#### Phase 4: 系统集成
- [ ] 对接学校统一身份认证
- [ ] 数据库迁移到 PostgreSQL
- [ ] Redis 缓存
- [ ] 生产环境部署

---

## 🔧 配置说明

### 后端环境变量 (`.env`)

```env
# 数据库
DATABASE_URL=sqlite:///./test.db

# JWT
JWT_SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# AI Provider (后续配置)
AI_PROVIDER=coze
AI_API_KEY=your-api-key
```

### 前端环境变量 (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📖 API 文档

启动后端后，访问 `http://localhost:8000/docs` 查看完整的 API 文档（Swagger UI）。

**主要端点**:

- `POST /api/v1/auth/login` - 用户登录
- `GET /api/v1/auth/me` - 获取当前用户
- `POST /api/v1/sessions` - 创建会话
- `POST /api/v1/ai/chat` - AI 对话（占位）
- `GET /api/v1/materials` - 获取材料列表

---

## 💰 成本控制

**MVP 阶段（当前）**:
- 前端: Vercel 免费托管（或本地运行）
- 后端: 本地运行或 Railway 免费额度
- 数据库: SQLite（本地）或 Supabase 免费额度
- **总成本**: ¥0

**生产环境（预算 ¥2000）**:
- 服务器: 阿里云 ECS 2核4G (~¥100/月)
- 数据库: 自建或 RDS (~¥200/月)
- AI 调用: 按使用量计费
- CDN: 阿里云 OSS + CDN (~¥50/月)

---

## 🤝 开发规范

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

### 代码规范

- 前端: ESLint + Prettier
- 后端: Black + isort
- 命名: 使用语义化命名
- 注释: 关键逻辑添加注释

---

## 📧 联系方式

如有问题，请联系项目负责人。

---

## 📄 许可证

本项目仅用于 BNBU 内部教学，未经许可不得商用。

