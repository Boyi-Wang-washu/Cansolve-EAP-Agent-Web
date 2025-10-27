# 🔍 Flask 项目部署准备检查

## 快速检查您的 Flask 项目

### 步骤 1: 检查项目位置

您的 Flask 项目在哪里？

```powershell
# 查找 memorized 文件夹
Get-ChildItem -Path "C:\Users\10846\Desktop" -Recurse -Directory -Filter "memorized" -ErrorAction SilentlyContinue
```

### 步骤 2: 检查必需文件

```powershell
# 假设 Flask 项目在 memorized 目录
cd "路径\memorized"

# 检查必需文件
Test-Path app.py          # 应该返回 True
Test-Path requirements.txt # 应该返回 True
```

### 步骤 3: 检查 app.py 端口配置

查看 `app.py` 最后几行是否有：

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

需要改为：

```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

并在文件顶部添加：
```python
import os
```

### 步骤 4: 创建 Procfile

```powershell
# 在 memorized 目录
echo "web: python app.py" > Procfile
```

### 步骤 5: 创建 .gitignore

```powershell
@"
__pycache__/
*.pyc
.env
.DS_Store
venv/
*.log
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

---

## 完整检查清单

- [ ] 找到 Flask 项目位置
- [ ] `app.py` 存在
- [ ] `requirements.txt` 存在
- [ ] `app.py` 使用 PORT 环境变量
- [ ] 创建 `Procfile`
- [ ] 创建 `.gitignore`
- [ ] 测试本地运行：`python app.py`

---

## 如果找不到 memorized 文件夹

您可能需要告诉我：

1. Flask 项目的实际位置
2. Flask 主文件名称（如果不是 app.py）
3. 是否已经有 Flask 项目

---

**准备好后，继续查看 FLASK_DEPLOYMENT_RAILWAY.md 进行部署！**

