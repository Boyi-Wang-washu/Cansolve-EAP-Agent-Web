# 🚀 快速启动指南

## 📋 前置要求

- ✅ Node.js 18+ 和 npm
- ✅ Python 3.11+
- ✅ Windows 系统（如使用 `start.bat`）

## 🎯 快速启动（推荐）

### 方法1: 使用启动脚本（Windows）

双击运行 `start.bat`，脚本会自动：
1. 启动后端服务器（端口 8000）
2. 启动前端服务器（端口 3000）
3. 打开浏览器

### 方法2: 手动启动

#### 第一步：配置环境变量

参考 `ENV_SETUP.md` 创建环境配置文件。

快速配置（Windows PowerShell）：
```powershell
# 前端配置
New-Item -Path ".env.local" -ItemType File -Force
Add-Content -Path ".env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8000"

# 后端配置 - 需要手动创建 backend\.env 文件，内容见 ENV_SETUP.md
```

#### 第二步：安装依赖

**后端依赖：**
```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
.\venv\Scripts\activate          # Windows
# source venv/bin/activate       # Mac/Linux

# 安装依赖
pip install -r requirements.txt
```

**前端依赖：**
```bash
# 在项目根目录
npm install
```

#### 第三步：启动服务

**启动后端（终端1）：**
```bash
cd backend
.\venv\Scripts\activate    # 激活虚拟环境
python run.py
```
后端运行在: http://localhost:8000
API 文档: http://localhost:8000/docs

**启动前端（终端2）：**
```bash
npm run dev
```
前端运行在: http://localhost:3000

## 🔑 测试账号

打开浏览器访问 http://localhost:3000，使用以下账号登录：

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 学生 | student001 | student123 |
| 教师 | teacher001 | teacher123 |
| 管理员 | admin | admin123 |

## 🎨 功能测试流程

### 学生端测试流程：
1. ✅ **登录** - 使用 `student001 / student123`
2. ✅ **选择材料** - 点击 "Start 1v1 Tutoring"
3. ✅ **开始对话** - 输入材料代码（如 `ENG-2025-U1-A`）或选择推荐材料
4. ✅ **聊天交互** - 与 AI 导师对话（占位响应）
5. ✅ **开始测验** - 点击 "Take Quiz" 按钮
6. ✅ **完成测验** - 回答问题并提交
7. ✅ **查看报告** - 返回仪表盘，点击 "View My Reports"

### 教师端测试流程：
1. ✅ **登录** - 使用 `teacher001 / teacher123`
2. ✅ **材料管理** - 侧边栏点击 "Materials"
3. ✅ **上传材料** - 点击 "Upload Material" 按钮
4. ✅ **填写信息** - 上传文件（占位）、填写标题和描述
5. ✅ **查看列表** - 返回材料列表查看已上传材料

## 🔧 常见问题

### Q: 后端启动失败？
**A:** 确保：
1. Python 版本 3.11+: `python --version`
2. 虚拟环境已激活（命令行前有 `(venv)` 标识）
3. 依赖已安装: `pip list`

### Q: 前端启动失败？
**A:** 确保：
1. Node.js 版本 18+: `node --version`
2. 依赖已安装: `npm install`
3. 删除 `.next` 文件夹后重试

### Q: 页面样式错乱？
**A:** 检查：
1. TailwindCSS 配置是否正确
2. 清除浏览器缓存
3. 重启开发服务器

### Q: API 请求失败？
**A:** 检查：
1. 后端是否正常运行（访问 http://localhost:8000/health）
2. `.env.local` 中 API URL 配置是否正确
3. 浏览器控制台查看具体错误

## 📝 MVP 阶段说明

当前为 **MVP（最小可行产品）** 版本，以下功能为**占位实现**：

- 🔲 **AI 对话** - 返回占位文本，您需要接入真实 AI API
- 🔲 **文件上传** - 不实际处理文件，仅模拟
- 🔲 **测验生成** - 使用预设题目，需要接入 AI 生成
- 🔲 **报告生成** - 使用模拟数据，需要接入 AI 分析
- 🔲 **数据持久化** - 使用 SQLite 内存数据，刷新后丢失

所有占位功能都预留了接口，您可以按需实现。

## 🎯 下一步

1. ✅ 测试所有页面和功能
2. 🔲 接入您的 AI API（修改 `backend/app/api/v1/endpoints/ai.py`）
3. 🔲 实现文件上传和处理（修改 `backend/app/api/v1/endpoints/materials.py`）
4. 🔲 完善数据库操作（各端点的 TODO 部分）
5. 🔲 部署到生产环境

## 📚 更多文档

- `README.md` - 项目详细说明
- `ARCHITECTURE.md` - 架构设计
- `DEVELOPMENT.md` - 开发规范
- `DEPLOYMENT.md` - 部署指南
- `ENV_SETUP.md` - 环境配置详细说明

## 🆘 需要帮助？

如有问题，请检查：
1. 终端错误日志
2. 浏览器控制台
3. API 文档 (http://localhost:8000/docs)

---

**祝您开发顺利！** 🎉

