# 🎓 Cansolve EAP Agent Web

> BNBU English Teaching Assistant - AI-powered platform for English learning

一个基于 AI 的英语教学辅助平台，为学生和教师提供个性化的英语学习和教学支持。

## 🌟 在线演示

- **前端地址**: [即将部署到 Vercel]
- **测试账号**: 
  - 学生: `student001` / `student123`
  - 教师: `teacher001` / `teacher123`

## ✨ 主要功能

### 学生端
- 🤖 **1v1 AI 辅导** - 与 AI 导师进行英语对话练习
- 📝 **智能测验** - 多种题型（选择题、填空、纠错等）
- 📊 **学习报告** - 多维度评分和学习分析
- 📚 **材料选择** - 选择感兴趣的阅读材料

### 教师端
- 📤 **材料上传** - 上传 PDF/DOC/TXT 教学材料
- 📋 **材料管理** - 管理和组织教学资源
- 👥 **学生监控** - 查看学生学习进度
- 📈 **数据分析** - 班级学习数据统计

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: TailwindCSS
- **状态管理**: Zustand
- **数据请求**: Axios + React Query
- **图标**: Font Awesome

### 后端
- **框架**: FastAPI (Python 3.11+)
- **数据库**: PostgreSQL / SQLite
- **ORM**: SQLAlchemy 2.0
- **认证**: JWT
- **AI 集成**: 预留接口（Coze/智谱等）

## 🚀 快速开始

### 前置要求
- Node.js 18+
- Python 3.11+
- npm 或 yarn

### 安装依赖

**后端**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

**前端**:
```bash
npm install
```

### 配置环境变量

**前端** - 创建 `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**后端** - 创建 `backend/.env`:
```env
DATABASE_URL=sqlite:///./test.db
JWT_SECRET_KEY=your-secret-key
CORS_ORIGINS=["http://localhost:3000"]
```

### 启动服务

**后端**:
```bash
cd backend
python run.py
```

**前端**:
```bash
npm run dev
```

访问 http://localhost:3000

## 📚 文档

- [快速开始指南](./QUICKSTART_CN.md)
- [环境配置](./ENV_SETUP.md)
- [功能清单](./FEATURE_CHECKLIST.md)
- [架构设计](./ARCHITECTURE.md)

## 🎯 MVP 状态

当前为 MVP（最小可行产品）版本：

- ✅ **UI/UX**: 100% 完成
- ✅ **前端交互**: 100% 完成
- ✅ **API 框架**: 100% 完成
- 🔲 **AI 集成**: 占位（需接入真实 AI API）
- 🔲 **文件处理**: 占位（需实现文本提取）
- 🔲 **数据持久化**: 占位（需实现数据库操作）

## 📝 开发计划

### Phase 1: AI 集成
- [ ] 接入 AI 对话 API
- [ ] 实现智能题目生成
- [ ] 实现学习报告分析

### Phase 2: 文件处理
- [ ] PDF/DOC 文本提取
- [ ] 材料版本管理
- [ ] 文件存储优化

### Phase 3: 生产部署
- [ ] 迁移到 PostgreSQL
- [ ] 性能优化
- [ ] 安全加固

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目仅用于 BNBU 内部教学使用。

## 📧 联系方式

如有问题，请提交 Issue 或联系项目维护者。

---

**Made with ❤️ for BNBU**

