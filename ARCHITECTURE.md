# 🏗️ 项目架构文档

本文档详细描述 BNBU EAP Assistant 的系统架构设计。

---

## 📐 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                      用户层 (Users)                      │
│   学生 (Students) | 教师 (Teachers) | 管理员 (Admins)    │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  前端应用 (Frontend)                      │
│         Next.js 14 + React 18 + TypeScript               │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │  Pages   │  │Components│  │  Stores  │               │
│  │  路由页面 │  │  UI组件  │  │  状态管理 │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/REST API
                      │ (JSON)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  后端应用 (Backend)                       │
│              FastAPI + Python 3.11                       │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │   API    │  │ Business │  │   Auth   │               │
│  │  Routes  │  │  Logic   │  │   认证   │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└─────────┬───────────────────┬─────────────────┬─────────┘
          │                   │                 │
          ▼                   ▼                 ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Database   │    │  File Store  │    │  AI Provider │
│  PostgreSQL  │    │   (本地/OSS)  │    │ (扣子/智谱)  │
│   /SQLite    │    │              │    │  (待接入)    │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 🔧 技术栈详情

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.2.5 | React 全栈框架 |
| React | 18.3.1 | UI 库 |
| TypeScript | 5.5.4 | 类型安全 |
| TailwindCSS | 3.4.7 | 样式框架 |
| Zustand | 4.5.4 | 状态管理 |
| React Query | 5.51.1 | 数据请求管理 |
| Axios | 1.7.2 | HTTP 客户端 |
| Font Awesome | 6.7.2 | 图标库 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| FastAPI | 0.111.0 | Web 框架 |
| Uvicorn | 0.30.1 | ASGI 服务器 |
| SQLAlchemy | 2.0.30 | ORM |
| PostgreSQL | - | 数据库（生产） |
| SQLite | - | 数据库（开发） |
| Pydantic | 2.7.4 | 数据验证 |
| python-jose | 3.3.0 | JWT 认证 |
| httpx | 0.27.0 | 异步 HTTP 客户端 |

---

## 📁 目录结构

```
全栈开发V1/
│
├── src/                          # 前端源码
│   ├── app/                      # Next.js App Router
│   │   ├── auth/                 # 认证页面
│   │   │   └── login/            # 登录页
│   │   ├── dashboard/            # 仪表盘
│   │   ├── tutor/                # 1v1 辅导
│   │   │   ├── select-material/  # 选择材料
│   │   │   └── chat/             # 对话页面
│   │   ├── teacher/              # 教师端
│   │   │   └── materials/        # 材料管理
│   │   ├── admin/                # 管理员端（占位）
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 首页
│   │   ├── providers.tsx         # 全局 Providers
│   │   └── globals.css           # 全局样式
│   │
│   ├── components/               # 组件
│   │   └── layout/               # 布局组件
│   │       ├── Header.tsx        # 顶部导航
│   │       ├── Sidebar.tsx       # 侧边栏
│   │       └── DashboardLayout.tsx
│   │
│   ├── lib/                      # 工具库
│   │   ├── api.ts                # API 客户端
│   │   └── types.ts              # 类型定义
│   │
│   └── store/                    # 状态管理
│       └── authStore.ts          # 认证状态
│
├── backend/                      # 后端源码
│   ├── app/
│   │   ├── api/                  # API 路由
│   │   │   └── v1/
│   │   │       ├── __init__.py   # API Router
│   │   │       └── endpoints/    # API 端点
│   │   │           ├── auth.py   # 认证
│   │   │           ├── materials.py  # 材料
│   │   │           ├── sessions.py   # 会话
│   │   │           └── ai.py     # AI 接口
│   │   │
│   │   ├── core/                 # 核心配置
│   │   │   ├── config.py         # 配置
│   │   │   └── security.py       # 安全/认证
│   │   │
│   │   ├── db/                   # 数据库
│   │   │   ├── database.py       # 连接
│   │   │   └── models.py         # 模型
│   │   │
│   │   └── main.py               # 主应用
│   │
│   ├── requirements.txt          # Python 依赖
│   └── run.py                    # 启动脚本
│
├── ui_pages_496770912770/        # UI 原型参考
│
├── package.json                  # Node.js 配置
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.ts            # TailwindCSS 配置
├── next.config.mjs               # Next.js 配置
│
├── README.md                     # 项目说明
├── QUICKSTART.md                 # 快速启动
├── DEVELOPMENT.md                # 开发指南
├── DEPLOYMENT.md                 # 部署指南
├── ARCHITECTURE.md               # 架构文档
│
├── start.bat                     # Windows 启动脚本
└── start.sh                      # Unix 启动脚本
```

---

## 🔐 认证流程

```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│  用户   │                    │  前端   │                    │  后端   │
└────┬────┘                    └────┬────┘                    └────┬────┘
     │                              │                              │
     │ 1. 输入用户名/密码             │                              │
     │─────────────────────────────>│                              │
     │                              │                              │
     │                              │ 2. POST /api/v1/auth/login  │
     │                              │─────────────────────────────>│
     │                              │                              │
     │                              │                              │ 3. 验证
     │                              │                              │    用户
     │                              │                              │
     │                              │ 4. 返回 JWT Token + 用户信息 │
     │                              │<─────────────────────────────│
     │                              │                              │
     │                              │ 5. 存储 Token 到 localStorage│
     │                              │                              │
     │ 6. 跳转到 Dashboard           │                              │
     │<─────────────────────────────│                              │
     │                              │                              │
     │                              │ 7. 后续请求携带 Token         │
     │                              │─────────────────────────────>│
     │                              │    Authorization: Bearer XXX │
     │                              │                              │
```

**JWT Payload**:
```json
{
  "sub": "s001",           // 用户 ID
  "role": "student",       // 用户角色
  "exp": 1234567890        // 过期时间
}
```

---

## 💬 对话流程（1v1 辅导）

```
┌─────────┐         ┌─────────┐         ┌─────────┐         ┌─────────┐
│  学生   │         │  前端   │         │  后端   │         │   AI    │
└────┬────┘         └────┬────┘         └────┬────┘         └────┬────┘
     │                   │                   │                   │
     │ 1. 选择材料        │                   │                   │
     │──────────────────>│                   │                   │
     │                   │                   │                   │
     │                   │ 2. 创建会话        │                   │
     │                   │  POST /sessions   │                   │
     │                   │──────────────────>│                   │
     │                   │                   │                   │
     │                   │ 3. 返回 session_id│                   │
     │                   │<──────────────────│                   │
     │                   │                   │                   │
     │ 4. 发送消息        │                   │                   │
     │──────────────────>│                   │                   │
     │                   │ 5. POST /ai/chat  │                   │
     │                   │──────────────────>│                   │
     │                   │                   │                   │
     │                   │                   │ 6. 调用 AI API    │
     │                   │                   │──────────────────>│
     │                   │                   │                   │
     │                   │                   │ 7. AI 响应        │
     │                   │                   │<──────────────────│
     │                   │                   │                   │
     │                   │ 8. 返回 AI 回复   │                   │
     │                   │<──────────────────│                   │
     │                   │                   │                   │
     │ 9. 显示回复        │                   │                   │
     │<──────────────────│                   │                   │
     │                   │                   │                   │
     │ 10. 结束会话       │                   │                   │
     │──────────────────>│                   │                   │
     │                   │ 11. POST /sessions/│                   │
     │                   │     {id}/end      │                   │
     │                   │──────────────────>│                   │
     │                   │                   │                   │
     │                   │                   │ 12. 生成报告      │
     │                   │                   │    (异步)         │
     │                   │                   │                   │
```

**流式响应（SSE）**:
```
Client                    Server
  │                         │
  │ POST /ai/chat/stream    │
  │────────────────────────>│
  │                         │
  │  data: {"delta": "I"}   │
  │<────────────────────────│
  │  data: {"delta": " am"} │
  │<────────────────────────│
  │  data: {"delta": " ..."}│
  │<────────────────────────│
  │  data: {"done": true}   │
  │<────────────────────────│
```

---

## 💾 数据模型

### ER 图

```
┌──────────────┐         ┌──────────────┐
│    Users     │         │  Materials   │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ name         │         │ code (UNIQUE)│
│ email        │         │ title        │
│ role         │<────┐   │ created_by   │
│ class_id     │     │   │ is_active    │
│ created_at   │     │   │ version      │
└──────┬───────┘     │   └──────┬───────┘
       │             │          │
       │             │          │ 1:N
       │ 1:N         │          │
       │             │          ▼
       │             │   ┌──────────────┐
       │             └───│MaterialTexts │
       │                 ├──────────────┤
       │                 │ id (PK)      │
       │                 │ material_id  │
       │                 │ text_full    │
       │                 │ char_count   │
       │                 └──────────────┘
       │
       ▼
┌──────────────┐
│   Sessions   │
├──────────────┤
│ id (PK)      │
│ user_id (FK) │
│ material_id  │
│ mode         │
│ status       │
│ started_at   │
│ ended_at     │
└──────┬───────┘
       │
       │ 1:N
       │
       ▼
┌──────────────┐
│   Messages   │
├──────────────┤
│ id (PK)      │
│ session_id   │
│ role         │
│ content      │
│ tokens       │
│ created_at   │
└──────────────┘
```

---

## 🔌 API 接口设计

### 认证接口

```
POST   /api/v1/auth/login          # 用户登录
GET    /api/v1/auth/me             # 获取当前用户信息
```

### 材料接口

```
GET    /api/v1/materials           # 获取材料列表
GET    /api/v1/materials/{id}      # 获取材料详情
POST   /api/v1/materials           # 创建材料（上传文件）
PUT    /api/v1/materials/{id}      # 更新材料
DELETE /api/v1/materials/{id}      # 删除材料
```

### 会话接口

```
POST   /api/v1/sessions            # 创建会话
GET    /api/v1/sessions            # 获取会话列表
GET    /api/v1/sessions/{id}       # 获取会话详情
POST   /api/v1/sessions/{id}/end   # 结束会话
```

### AI 接口

```
POST   /api/v1/ai/chat             # AI 对话（非流式）
POST   /api/v1/ai/chat/stream      # AI 对话（流式）
POST   /api/v1/ai/generate-quiz    # 生成小测
POST   /api/v1/ai/generate-report  # 生成报告
```

---

## 🚀 性能优化策略

### 前端优化

1. **代码分割**: 使用 Next.js 动态导入
2. **图片优化**: 使用 Next/Image 组件
3. **静态生成**: 公共页面使用 SSG
4. **缓存策略**: React Query 缓存 API 响应

### 后端优化

1. **数据库索引**: 为常用查询字段添加索引
2. **连接池**: 配置数据库连接池
3. **异步处理**: 耗时操作使用后台任务
4. **API 缓存**: Redis 缓存热点数据

---

## 🔒 安全措施

1. **认证**: JWT Token 认证
2. **授权**: 基于角色的访问控制（RBAC）
3. **CORS**: 配置允许的来源
4. **SQL 注入防护**: 使用 ORM 参数化查询
5. **XSS 防护**: React 自动转义
6. **HTTPS**: 生产环境强制 HTTPS
7. **密码加密**: Bcrypt 哈希

---

## 📈 扩展性考虑

### 水平扩展

- 前端: 部署多个实例 + 负载均衡
- 后端: 使用 Gunicorn 多进程 + Nginx 负载均衡
- 数据库: 主从复制 + 读写分离

### AI 服务集成

```python
# 适配器模式支持多 AI 平台
class AIProviderAdapter:
    @abstractmethod
    async def chat(self, messages):
        pass

class CozeProvider(AIProviderAdapter):
    async def chat(self, messages):
        # 扣子 API 调用
        pass

class ZhipuProvider(AIProviderAdapter):
    async def chat(self, messages):
        # 智谱 API 调用
        pass
```

---

## 🎯 后续架构演进

### Phase 1: 微服务化（可选）
- 拆分 AI 服务为独立微服务
- 使用消息队列（RabbitMQ/Redis）

### Phase 2: 实时通信
- WebSocket 支持实时对话
- Redis Pub/Sub 多实例通信

### Phase 3: 大数据分析
- 学习数据分析平台
- 使用 Spark/Flink 处理大规模数据

---

本架构文档会随项目发展持续更新。

