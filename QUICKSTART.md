# 🚀 快速启动指南

这是一份 5 分钟快速启动指南，帮助你立即运行 BNBU EAP Assistant MVP。

---

## ⚡ 一键启动（推荐）

### Windows

双击运行 `start.bat`

### macOS/Linux

```bash
chmod +x start.sh
./start.sh
```

---

## 🔧 手动启动

### 步骤 1: 启动后端

```bash
# Windows
cd backend
venv\Scripts\activate
python run.py

# macOS/Linux
cd backend
source venv/bin/activate
python run.py
```

后端将在 `http://localhost:8000` 运行

### 步骤 2: 启动前端

在**新的终端窗口**中:

```bash
# 返回项目根目录
cd ..

# 启动前端
npm run dev
```

前端将在 `http://localhost:3000` 运行

### 步骤 3: 访问应用

在浏览器中打开: `http://localhost:3000`

---

## 🎭 测试账号

| 角色 | 用户名 | 密码 | 功能 |
|------|--------|------|------|
| **学生** | student001 | student123 | 1v1 辅导、学习报告 |
| **教师** | teacher001 | teacher123 | 材料管理、学生数据 |
| **管理员** | admin | admin123 | 系统管理 |

---

## ✅ 功能测试清单

### 学生端测试
1. ✅ 使用 `student001` 登录
2. ✅ 查看仪表盘（Dashboard）
3. ✅ 点击 "Start 1v1 Tutoring"
4. ✅ 选择材料或输入材料码（如 `ENG-2025-U1-A`）
5. ✅ 开始对话，发送消息
6. ✅ 测试快捷语用按钮（I agree / I disagree）
7. ✅ 结束会话

### 教师端测试
1. ✅ 使用 `teacher001` 登录
2. ✅ 查看材料列表
3. ✅ 查看学生数据（占位）

---

## 🐛 常见问题

### 问题 1: 后端启动失败

**错误**: `ModuleNotFoundError: No module named 'fastapi'`

**解决**:
```bash
cd backend
pip install -r requirements.txt
```

### 问题 2: 前端启动失败

**错误**: `Error: Cannot find module 'next'`

**解决**:
```bash
npm install
```

### 问题 3: 端口被占用

**错误**: `Port 3000 is already in use`

**解决**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### 问题 4: 前端无法连接后端

**检查**:
1. 后端是否正常运行（访问 `http://localhost:8000`）
2. `.env.local` 中的 `NEXT_PUBLIC_API_URL` 是否正确
3. CORS 配置是否包含 `http://localhost:3000`

---

## 📱 在其他设备上访问（局域网）

### 1. 查找你的本地 IP

```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
# 或
ip addr show
```

找到类似 `192.168.x.x` 的地址

### 2. 修改前端配置

编辑 `.env.local`:
```
NEXT_PUBLIC_API_URL=http://你的IP:8000
```

### 3. 在其他设备访问

```
http://你的IP:3000
```

---

## 🎯 下一步

- [ ] 阅读 [README.md](./README.md) 了解项目详情
- [ ] 阅读 [DEVELOPMENT.md](./DEVELOPMENT.md) 开始开发
- [ ] 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md) 准备部署
- [ ] 接入 AI 服务（参考 AI 集成文档）

---

## 💡 提示

- **第一次启动**: 后端会自动创建 SQLite 数据库
- **热重载**: 修改代码后会自动刷新
- **API 文档**: 访问 `http://localhost:8000/docs` 查看完整 API
- **浏览器兼容**: 推荐使用 Chrome/Edge 最新版

---

## 📞 需要帮助？

如果遇到问题，请检查:
1. Python 版本 >= 3.11
2. Node.js 版本 >= 18
3. 所有依赖已正确安装
4. 端口 3000 和 8000 未被占用

祝你使用愉快！🎉


