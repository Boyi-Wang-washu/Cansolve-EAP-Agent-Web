# 部署指南

本文档提供 BNBU EAP Assistant 的详细部署说明。

---

## 📋 部署前检查清单

- [ ] 已测试所有核心功能
- [ ] 已配置生产环境变量
- [ ] 已准备数据库（PostgreSQL）
- [ ] 已准备域名和 SSL 证书（可选）
- [ ] 已设置备份策略

---

## 🌐 部署方案

### 方案 A: 本地/校园服务器部署（推荐用于 MVP 展示）

#### 1. 环境准备

**服务器要求**:
- OS: Ubuntu 20.04+ / Windows Server 2019+
- CPU: 2 核心+
- RAM: 4GB+
- 存储: 50GB+

**安装依赖**:

```bash
# Ubuntu
sudo apt update
sudo apt install python3.11 python3.11-venv nodejs npm postgresql nginx

# Windows
# 下载安装 Python 3.11, Node.js, PostgreSQL
```

#### 2. 后端部署

```bash
# 创建工作目录
mkdir -p /opt/bnbu-eap
cd /opt/bnbu-eap

# 克隆/复制项目
cp -r /path/to/backend ./backend
cd backend

# 创建虚拟环境
python3.11 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
nano .env  # 编辑配置

# 关键配置项：
# DATABASE_URL=postgresql://user:password@localhost:5432/bnbu_eap
# JWT_SECRET_KEY=生成一个强密钥
# DEBUG=False

# 初始化数据库
python run.py  # 首次运行会创建表
```

#### 3. 使用 systemd 管理后端服务（Linux）

创建服务文件 `/etc/systemd/system/bnbu-eap-backend.service`:

```ini
[Unit]
Description=BNBU EAP Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/bnbu-eap/backend
Environment="PATH=/opt/bnbu-eap/backend/venv/bin"
ExecStart=/opt/bnbu-eap/backend/venv/bin/python run.py
Restart=always

[Install]
WantedBy=multi-user.target
```

启动服务:

```bash
sudo systemctl daemon-reload
sudo systemctl enable bnbu-eap-backend
sudo systemctl start bnbu-eap-backend
sudo systemctl status bnbu-eap-backend
```

#### 4. 前端部署

```bash
cd /opt/bnbu-eap
cp -r /path/to/frontend ./frontend
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
nano .env.local

# 关键配置项：
# NEXT_PUBLIC_API_URL=http://your-backend-domain:8000

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

#### 5. 使用 PM2 管理前端（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "bnbu-eap-frontend" -- start

# 设置开机自启
pm2 startup
pm2 save
```

#### 6. Nginx 反向代理

创建配置文件 `/etc/nginx/sites-available/bnbu-eap`:

```nginx
# 后端 API
server {
    listen 80;
    server_name api.bnbu-eap.local;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# 前端
server {
    listen 80;
    server_name bnbu-eap.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置:

```bash
sudo ln -s /etc/nginx/sites-available/bnbu-eap /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 方案 B: 云服务部署（适合正式运行）

#### 1. 前端部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd frontend
vercel --prod
```

配置环境变量（在 Vercel Dashboard）:
- `NEXT_PUBLIC_API_URL`: 后端 API 地址

#### 2. 后端部署到 Railway/Render

**Railway**:

1. 登录 [Railway](https://railway.app)
2. 创建新项目 -> Deploy from GitHub
3. 选择后端目录
4. 添加环境变量
5. 部署完成

**Render**:

1. 登录 [Render](https://render.com)
2. New -> Web Service
3. 连接 GitHub 仓库
4. 配置:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python run.py`
5. 添加环境变量
6. 部署

#### 3. 数据库 - Supabase

1. 登录 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取连接字符串
4. 在后端环境变量中配置 `DATABASE_URL`

---

## 🔒 安全配置

### 1. 更新密钥

```bash
# 生成强密钥
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

在 `.env` 中设置:
```
SECRET_KEY=生成的密钥
JWT_SECRET_KEY=生成的密钥
```

### 2. 配置 CORS

后端 `app/core/config.py`:
```python
CORS_ORIGINS = [
    "https://your-frontend-domain.com",
    "http://localhost:3000",  # 开发环境
]
```

### 3. 配置 HTTPS（生产环境）

使用 Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d bnbu-eap.local -d api.bnbu-eap.local
```

---

## 📊 监控和日志

### 1. 后端日志

```bash
# 查看 systemd 日志
sudo journalctl -u bnbu-eap-backend -f

# 查看应用日志
tail -f /opt/bnbu-eap/backend/logs/app.log
```

### 2. 前端日志

```bash
# PM2 日志
pm2 logs bnbu-eap-frontend
```

### 3. 数据库备份

```bash
# 创建备份脚本 /opt/bnbu-eap/backup.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump bnbu_eap > /opt/bnbu-eap/backups/backup_$DATE.sql
find /opt/bnbu-eap/backups/ -name "*.sql" -mtime +7 -delete

# 设置定时任务
crontab -e
# 每天凌晨 2 点备份
0 2 * * * /opt/bnbu-eap/backup.sh
```

---

## 🚀 性能优化

### 1. 后端优化

- 使用 Gunicorn + Uvicorn workers:
  ```bash
  pip install gunicorn
  gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
  ```

- 启用 Redis 缓存:
  ```python
  # .env
  REDIS_URL=redis://localhost:6379/0
  ```

### 2. 前端优化

- 启用 Next.js 静态生成
- 使用 CDN 加速静态资源
- 图片优化（使用 Next/Image）

---

## 📱 访问配置

MVP 展示时，可以使用以下方式让客户访问：

### 方案 1: 局域网访问（最简单）

1. 确保你的电脑和客户设备在同一局域网
2. 查找你的本地 IP:
   ```bash
   # Windows
   ipconfig
   # macOS/Linux
   ifconfig
   ```
3. 客户访问: `http://你的IP:3000`

### 方案 2: 内网穿透（远程展示）

使用 ngrok:

```bash
# 安装 ngrok
# 访问 https://ngrok.com 下载

# 启动隧道
ngrok http 3000  # 前端
ngrok http 8000  # 后端
```

获得公网地址后，更新前端的 `NEXT_PUBLIC_API_URL`。

---

## 🐛 故障排查

### 常见问题

1. **后端无法启动**
   - 检查端口 8000 是否被占用
   - 检查数据库连接
   - 查看日志: `journalctl -u bnbu-eap-backend`

2. **前端无法连接后端**
   - 检查 `NEXT_PUBLIC_API_URL` 配置
   - 检查 CORS 设置
   - 检查防火墙规则

3. **数据库连接失败**
   - 验证数据库服务是否运行
   - 检查连接字符串格式
   - 验证用户权限

---

## 📞 技术支持

如遇到部署问题，请联系技术团队。


