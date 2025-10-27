# 🚀 Flask API 部署到 Railway 指南

## 📋 前提条件

- ✅ Flask API 项目（memorized 文件夹）
- ✅ GitHub 账号
- ✅ Railway 账号（免费注册）

---

## 第一步：准备 Flask 项目

### 1. 检查项目结构

您的 Flask 项目应该有：
```
memorized/
├── app.py              # Flask 应用主文件
├── requirements.txt    # Python 依赖
└── ...其他文件
```

### 2. 确保 requirements.txt 包含所有依赖

```txt
Flask==2.3.0
flask-cors==4.0.0
openai==1.0.0
python-dotenv==1.0.0
# 其他依赖...
```

### 3. 创建 Procfile（Railway 需要）

在 `memorized/` 目录创建 `Procfile` 文件（无扩展名）：

```
web: python app.py
```

### 4. 修改 app.py 使用环境变量端口

确保 Flask 监听正确的端口：

```python
import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

---

## 第二步：上传 Flask 项目到 GitHub

### 方案 A：单独的 GitHub 仓库（推荐）

```bash
# 1. 进入 Flask 项目目录
cd memorized

# 2. 初始化 Git
git init

# 3. 创建 .gitignore
cat > .gitignore << EOF
__pycache__/
*.pyc
.env
.DS_Store
venv/
*.log
EOF

# 4. 提交代码
git add .
git commit -m "Initial commit: Flask Chat API"

# 5. 在 GitHub 创建新仓库（如：flask-chat-api）
# 6. 连接远程仓库
git remote add origin https://github.com/Boyi-Wang-washu/flask-chat-api.git
git branch -M main
git push -u origin main
```

### 方案 B：放在同一个仓库的子目录

```bash
# 在项目根目录
cd "全栈开发V2"

# 如果 memorized 文件夹在这里，直接 commit
git add memorized/
git commit -m "Add Flask Chat API"
git push origin main
```

---

## 第三步：在 Railway 部署

### 1. 注册/登录 Railway

访问：https://railway.app

点击 **"Login with GitHub"**

### 2. 创建新项目

1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 找到您的仓库（如 `flask-chat-api`）
4. 点击 **"Deploy Now"**

### 3. 配置项目（如果是子目录）

如果 Flask 在子目录（如 `memorized/`）：

1. 进入项目 **Settings**
2. 找到 **"Root Directory"**
3. 设置为：`memorized`
4. 保存

### 4. 配置环境变量

在 Railway 项目中：

1. 点击 **Variables** 标签
2. 添加环境变量：

```
PORT=5000
OPENAI_API_KEY=your-key-here
# 其他必要的环境变量
```

### 5. 生成公开域名

1. 在 Railway 项目中，点击 **Settings**
2. 找到 **"Domains"** 或 **"Networking"**
3. 点击 **"Generate Domain"**
4. 获得类似：`https://flask-chat-api-production.up.railway.app`

---

## 第四步：测试 Flask API

### 测试健康检查

```bash
curl https://你的域名.railway.app/api/health
```

应该返回：
```json
{
  "status": "ok",
  "message": "Chat API is running"
}
```

### 测试聊天接口

```bash
curl -X POST https://你的域名.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -H "X-User-ID: s001" \
  -d '{"message": "Hello"}'
```

---

## 第五步：更新 Vercel 环境变量

### 1. 访问 Vercel Dashboard

https://vercel.com/dashboard

### 2. 进入您的项目

找到 `cansolve-eap-agent-web`

### 3. 配置环境变量

1. 点击 **Settings**
2. 点击 **Environment Variables**
3. 添加/修改：

```
NEXT_PUBLIC_CHAT_API_URL = https://你的域名.railway.app
```

### 4. 重新部署

1. 进入 **Deployments** 标签
2. 找到最新的部署
3. 点击 **...** → **Redeploy**

---

## 第六步：测试在线网站

1. 访问：https://cansolve-eap-agent-web.vercel.app
2. 登录：`student001` / `student123`
3. 点击 "1v1 Tutoring"
4. 发送消息测试

---

## 🔧 故障排查

### 问题 1: Railway 部署失败

**检查**：
1. Railway 日志中的错误信息
2. `requirements.txt` 是否正确
3. `app.py` 中的端口配置

**解决**：
```python
# app.py 确保有这段
import os
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port)
```

### 问题 2: Vercel 连接失败

**检查**：
1. Railway 域名是否正确
2. Flask 是否配置了 CORS
3. 浏览器控制台的错误

**解决 CORS**：
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://cansolve-eap-agent-web.vercel.app"])
```

### 问题 3: API 返回 404

**检查**：
- Flask 路由是否正确
- Railway 域名后面的路径是否对

**测试**：
```bash
# 检查根路径
curl https://你的域名.railway.app/

# 检查 API 路径
curl https://你的域名.railway.app/api/health
```

---

## 💰 费用说明

### Railway 免费额度

- ✅ $5 免费额度/月
- ✅ 足够小规模使用
- ✅ 超出后按使用量计费

### 预计费用

- Flask API: ~$5-10/月
- 数据库（如需）: ~$5/月

---

## 📝 更新代码流程

以后更新 Flask 代码：

```bash
# 1. 修改代码
# 2. 提交到 GitHub
cd memorized
git add .
git commit -m "Update chat logic"
git push origin main

# 3. Railway 自动部署（2-3分钟）
```

---

## ✅ 部署清单

完成以下步骤即可：

- [ ] Flask 项目准备好（requirements.txt, Procfile, app.py）
- [ ] 上传到 GitHub
- [ ] 在 Railway 创建项目
- [ ] 配置 Railway 环境变量
- [ ] 生成 Railway 域名
- [ ] 测试 Flask API
- [ ] 更新 Vercel 环境变量
- [ ] 重新部署 Vercel
- [ ] 测试在线网站

---

## 🎯 下一步

部署完成后：

1. ✅ 在线网站可以使用聊天功能
2. ✅ 不需要本地运行 Flask
3. ✅ 同伴可以直接访问在线网站

---

**需要帮助？提供具体的错误信息，我会帮您解决！** 🚀

